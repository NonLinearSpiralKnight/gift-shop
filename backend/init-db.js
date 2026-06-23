// Файл: backend/init-db.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Явно указываем абсолютный путь
const dbPath = path.resolve(__dirname, 'db', 'database.db');

console.log(`📁 Путь к БД: ${dbPath}`);

// Проверяем и создаем папку db
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    console.log(`📁 Создаю папку: ${dbDir}`);
    fs.mkdirSync(dbDir, { recursive: true });
}

// Удаляем старый файл БД, если он есть (для чистоты)
if (fs.existsSync(dbPath)) {
    console.log('🗑️ Удаляю старую БД...');
    fs.unlinkSync(dbPath);
}

// Создаем новую БД
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Ошибка подключения к БД:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to SQLite database');
});

// Читаем и выполняем SQL файлы
function runSQLFile(filePath, callback) {
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Файл не найден: ${filePath}`);
        return callback(null);
    }
    
    const sql = fs.readFileSync(filePath, 'utf8');
    
    db.exec(sql, (err) => {
        if (err) {
            console.error(`❌ Ошибка выполнения ${path.basename(filePath)}:`, err.message);
            return callback(err);
        }
        console.log(`✅ Выполнен: ${path.basename(filePath)}`);
        callback(null);
    });
}

// Запускаем инициализацию
console.log('🚀 Начинаем инициализацию базы данных...');

const schemaPath = path.join(__dirname, 'db', 'schema.sql');
const seedPath = path.join(__dirname, 'db', 'seed.sql');

// Проверяем наличие файлов
console.log(`📄 schema.sql: ${fs.existsSync(schemaPath) ? '✅ есть' : '❌ нет'}`);
console.log(`📄 seed.sql: ${fs.existsSync(seedPath) ? '✅ есть' : '❌ нет'}`);

runSQLFile(schemaPath, (err) => {
    if (err) {
        db.close();
        process.exit(1);
    }
    
    runSQLFile(seedPath, (err) => {
        if (err) {
            db.close();
            process.exit(1);
        }
        
        // Проверяем результат
        db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
            if (err) {
                console.error('❌ Ошибка проверки:', err.message);
            } else {
                console.log(`✅ В базе данных ${row.count} товаров`);
            }
            
            db.close((err) => {
                if (err) {
                    console.error('❌ Ошибка закрытия БД:', err.message);
                } else {
                    console.log('✅ Database initialized successfully');
                }
            });
        });
    });
});