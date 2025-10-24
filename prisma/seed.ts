import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (development only)
  if (process.env.NODE_ENV !== "production") {
    console.log("🧹 Clearing existing seed data...");
    await prisma.feedback.deleteMany({ where: { student: { email: { in: ["alice@example.com", "pierre@example.com"] } } } });
    await prisma.resource.deleteMany({ where: { student: { email: { in: ["alice@example.com", "pierre@example.com"] } } } });
    await prisma.student.deleteMany({ where: { email: { in: ["alice@example.com", "pierre@example.com"] } } });
  }

  // Create sample students
  const student1 = await prisma.student.create({
    data: {
      email: "alice@example.com",
      name: "Alice Johnson",
      preferredLanguage: "en",
    },
  });

  const student2 = await prisma.student.create({
    data: {
      email: "pierre@example.com",
      name: "Pierre Dupont",
      preferredLanguage: "fr",
    },
  });

  console.log(`✅ Created students: ${student1.name}, ${student2.name}`);

  // Create sample resources (small text files as examples)
  const resource1 = await prisma.resource.create({
    data: {
      filename: "sample-document.txt",
      mimeType: "text/plain",
      fileSize: 26,
      fileData: Buffer.from("This is a sample document."),
      studentId: student1.id,
    },
  });

  const resource2 = await prisma.resource.create({
    data: {
      filename: "example-file.txt",
      mimeType: "text/plain",
      fileSize: 29,
      fileData: Buffer.from("Ceci est un fichier exemple."),
      studentId: student2.id,
    },
  });

  console.log(`✅ Created resources: ${resource1.filename}, ${resource2.filename}`);

  // Create sample feedback
  const feedback1 = await prisma.feedback.create({
    data: {
      content: "Great work on your essay! Consider adding more examples to support your arguments.",
      studentId: student1.id,
    },
  });

  const feedback2 = await prisma.feedback.create({
    data: {
      content: "Excellent présentation. Continuez à travailler sur la prononciation.",
      studentId: student2.id,
    },
  });

  console.log(`✅ Created feedback for ${student1.name} and ${student2.name}`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
