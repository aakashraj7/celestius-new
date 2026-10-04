import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Config from './models/Config.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/celestius';

async function seed() {
  console.log(' Connecting to MongoDB at:', MONGODB_URI.replace(/:([^:@]{3,})@/, ':****@'));
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
      bufferCommands: false,
    });
    console.log('✓ [DATABASE] Connected successfully.');

    const defaultDate = new Date('2026-10-15T23:59:59+05:30');
    let existing = await Config.findOne({ key: 'recruitment_config' }).lean();

    if (!existing) {
      await Config.create({
        key: 'recruitment_config',
        recruitmentOpenStatus: true,
        registrationCloseDate: defaultDate,
      });
      console.log('✓ [SEED] Created fresh recruitment_config document in MongoDB.');
    } else if (!existing.registrationCloseDate) {
      await Config.updateOne(
        { key: 'recruitment_config' },
        { $set: { registrationCloseDate: defaultDate } }
      );
      console.log('✓ [SEED] Added registrationCloseDate field directly into existing MongoDB document.');
    } else {
      console.log('✓ [SEED] recruitment_config already has registrationCloseDate in MongoDB.');
    }

    const finalDoc = await Config.findOne({ key: 'recruitment_config' }).lean();

    console.log({
      key: finalDoc.key,
      recruitmentOpenStatus: finalDoc.recruitmentOpenStatus,
      registrationCloseDate: finalDoc.registrationCloseDate ? finalDoc.registrationCloseDate.toISOString() : null,
      formattedIST: finalDoc.registrationCloseDate
        ? new Date(finalDoc.registrationCloseDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' IST'
        : 'N/A',
    });

    console.log('\n✓ Seeding completed successfully.');
  } catch (err) {
    console.error('✗ [SEED ERROR]:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log(' Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
