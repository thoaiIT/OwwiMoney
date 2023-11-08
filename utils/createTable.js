// 'use server';
const { db } = require('@vercel/postgres');
// // const { invoices, customers, revenue, users } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    // console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    // console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    // console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    // console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function createTableTYPES(client) {
  try {
    return await client.sql`
        CREATE TABLE IF NOT EXISTS TYPES (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT
      );
    `;
  } catch (error) {
    console.error('createTableTYPES:', error);
    throw error;
  }
}

async function createTableWALLETS(client) {
  try {
    return await client.sql`
        CREATE TABLE IF NOT EXISTS WALLETS (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT
      );
    `;
  } catch (error) {
    console.error('createTableWALLETS:', error);
    throw error;
  }
}

async function createTableCATEGORIES(client) {
  try {
    return await client.sql`
        CREATE TABLE IF NOT EXISTS CATEGORIES (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          type_id UUID REFERENCES types(id)
      );
    `;
  } catch (error) {
    console.error('createTableCATEGORIES', error);
    throw error;
  }
}

async function createTablePARTNERS(client) {
  try {
    return await client.sql`
      CREATE TABLE IF NOT EXISTS PARTNERS (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        contact VARCHAR(255),
        address VARCHAR(255),
        description TEXT,
        type_id UUID REFERENCES types(id) NOT NULL,
        email VARCHAR(255)
    );
    `;
  } catch (error) {
    console.error('createTablePARTNERS:', error);
    throw error;
  }
}

async function createTableUSER_BUDGETS(client) {
  try {
    return await client.sql`
      CREATE TABLE IF NOT EXISTS USER_BUDGETS (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        category_id UUID REFERENCES categories(id) NOT NULL,
        expected REAL,
        actual REAL,
        status VARCHAR(255)
    );
  `;
  } catch (error) {
    console.error('createTableUSER_BUDGETS:', error);
    throw error;
  }
}

async function createTableSESSIONS(client) {
  try {
    return await client.sql`
      CREATE TABLE IF NOT EXISTS SESSIONS (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        partner_id UUID REFERENCES partners(id) NOT NULL
    );
    `;
  } catch (error) {
    console.error('createTableSESSIONS:', error);
    throw error;
  }
}

async function createTableMESSAGES(client) {
  try {
    return await client.sql`
      CREATE TABLE IF NOT EXISTS MESSAGES (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        session_id UUID REFERENCES sessions(id) NOT NULL,
        content TEXT NOT NULL,
        createdTime VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL
    );
        
    `;
  } catch (error) {
    console.error('createTableMESSAGES:', error);
    throw error;
  }
}

async function createTableOTPS(client) {
  try {
    return await client.sql`
      CREATE TABLE IF NOT EXISTS OTPS (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        code VARCHAR(6),
        createdTime VARCHAR(255) NOT NULL,
        lifetime INT NOT NULL,
        status VARCHAR(255) NOT NULL
    );
        
    `;
  } catch (error) {
    console.error('createTableOTPS:', error);
    throw error;
  }
}

async function createTableTRANSACTIONS(client) {
  try {
    return await client.sql`
        CREATE TABLE IF NOT EXISTS TRANSACTIONS (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID REFERENCES users(id),
          amount NUMERIC NOT NULL,
          createdDate TIMESTAMP NOT NULL,
          partner_id UUID REFERENCES partners(id),
          category_id UUID REFERENCES categories(id),
          type_id UUID REFERENCES types(id),
          wallet_id UUID REFERENCES wallets(id),
          description TEXT,
          invoiceImageUrl TEXT,
          CHECK (
              user_id IS NOT NULL
              AND amount IS NOT NULL
              AND createdDate IS NOT NULL
              AND partner_id IS NOT NULL
              AND category_id IS NOT NULL
              AND type_id IS NOT NULL
          )
      );
    `;
  } catch (error) {
    console.error('createTableTRANSACTIONS:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  // await seedUsers(client);
  // await seedCustomers(client);
  // await seedInvoices(client);
  // await seedRevenue(client);

  await createTableTYPES(client);
  await createTableWALLETS(client);
  await createTableCATEGORIES(client);
  await createTablePARTNERS(client);
  await createTableUSER_BUDGETS(client);
  await createTableSESSIONS(client);
  await createTableMESSAGES(client);
  await createTableOTPS(client);
  await createTableTRANSACTIONS(client);
  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
