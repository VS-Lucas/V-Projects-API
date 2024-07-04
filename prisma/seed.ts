import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const hashedPassword1 = await bcrypt.hash('securepassword1', 10);
  const hashedPassword2 = await bcrypt.hash('securepassword2', 10);
  const hashedPassword3 = await bcrypt.hash('securepassword3', 10);
  const hashedPassword4 = await bcrypt.hash('securepassword4', 10);
  const hashedPassword5 = await bcrypt.hash('securepassword5', 10);
  const hashedPasswordAdmin = await bcrypt.hash('securepasswordAdmin', 10);

  // Seed for Users
  const usersData = [
    {
      email: 'vinicius@example.com',
      name: 'Vinícius',
      password: hashedPassword1,
      role: 'COLABORADOR',
      position: 'Developer',
      profilePhoto: 'https://randomuser.me/api/portraits/men/35.jpg',
      address: {
        create: {
          street: '123 Main St',
          district: 'Downtown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '1',
        },
      },
    },
    {
      email: 'ana@example.com',
      name: 'Ana',
      password: hashedPassword2,
      role: 'COLABORADOR',
      position: 'Designer',
      profilePhoto: 'https://randomuser.me/api/portraits/women/60.jpg',
      address: {
        create: {
          street: '456 Side St',
          district: 'Uptown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '2',
        },
      },
    },
    {
      email: 'eric@example.com',
      name: 'Eric',
      password: hashedPassword3,
      role: 'COLABORADOR',
      position: 'Manager',
      profilePhoto: 'https://randomuser.me/api/portraits/men/36.jpg',
      address: {
        create: {
          street: '789 Another St',
          district: 'Suburbia',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '3',
        },
      },
    },
    {
      email: 'breno@example.com',
      name: 'Breno',
      password: hashedPassword4,
      role: 'COLABORADOR',
      position: 'QA Engineer',
      profilePhoto: 'https://randomuser.me/api/portraits/men/37.jpg',
      address: {
        create: {
          street: '1011 Last St',
          district: 'Downtown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '4',
        },
      },
    },
    {
      email: 'lucas@example.com',
      name: 'Lucas',
      password: hashedPassword5,
      role: 'COLABORADOR',
      position: 'Student',
      profilePhoto: 'https://randomuser.me/api/portraits/men/39.jpg',
      address: {
        create: {
          street: '1011 Last St',
          district: 'Downtown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '4',
        },
      },
    },
    {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPasswordAdmin,
      role: 'SOCIO',
      position: 'Admin',
      profilePhoto: 'https://randomuser.me/api/portraits/women/40.jpg',
      address: {
        create: {
          street: '1213 Final St',
          district: 'Midtown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '5',
        },
      },
    },
  ];

  const users = await Promise.all(
    usersData.map(user => prisma.user.create({ data: user }))
  );

  // Seed for Criterion
  const criteriaData = [
    { name: 'Sentimento de Dono', type: 'COMPORTAMENTAIS' },
    { name: 'Resiliencia nas adversidades', type: 'COMPORTAMENTAIS' },
    { name: 'Organização no Trabalho', type: 'COMPORTAMENTAIS' },
    { name: 'Capacidade de aprender', type: 'COMPORTAMENTAIS' },
    { name: 'Ser "team player"', type: 'COMPORTAMENTAIS' },
    { name: 'Entregar com qualidade', type: 'EXECUCAO' },
    { name: 'Atender aos prazos', type: 'EXECUCAO' },
    { name: 'Fazer mais com menos', type: 'EXECUCAO' },
    { name: 'Pensar fora da caixa', type: 'EXECUCAO' },
  ];

  const criteria = await prisma.criterion.createMany({
    data: criteriaData
  });

  // Seed for Cycle
  const cycle = await prisma.cycle.create({
    data: {
      name: 'Cycle 1',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    },
  });

  // Seed for SelfAssessment
  const selfAssessmentsData = [
    {
      userId: users[0].id,
      cycleId: cycle.id,
      date: new Date(),
      meanGrade: 4.5,
      SelfAssessmentScores: {
        create: [
          {
            criterionId: 1,
            grade: 4.0,
            justification: 'Good performance in Q1.',
          },
          {
            criterionId: 2,
            grade: 5.0,
            justification: 'Excellent teamwork.',
          },
        ],
      },
    },
    {
      userId: users[1].id,
      cycleId: cycle.id,
      date: new Date(),
      meanGrade: 4.0,
      SelfAssessmentScores: {
        create: [
          {
            criterionId: 3,
            grade: 4.5,
            justification: 'Great organizational skills.',
          },
          {
            criterionId: 4,
            grade: 3.5,
            justification: 'Good learning capacity.',
          },
        ],
      },
    },
  ];

  const selfAssessments = await Promise.all(
    selfAssessmentsData.map(assessment => prisma.selfAssessment.create({ data: assessment }))
  );

  // Seed for PeerReview
  // const peerReviewsData = [
  //   {
  //     evaluatorId: users[0].id,
  //     evaluatedId: users[1].id,
  //     cycleId: cycle.id,
  //     meanGrade: 4.2,
  //     PeerReviewScores: {
  //       create: [
  //         {
  //           criterionId: 1,
  //           grade: 4.0,
  //           justification: 'Consistent performance.',
  //         },
  //         {
  //           criterionId: 2,
  //           grade: 4.5,
  //           justification: 'Strong leadership skills.',
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     evaluatorId: users[1].id,
  //     evaluatedId: users[0].id,
  //     cycleId: cycle.id,
  //     meanGrade: 4.8,
  //     PeerReviewScores: {
  //       create: [
  //         {
  //           criterionId: 3,
  //           grade: 4.9,
  //           justification: 'Excellent organization.',
  //         },
  //         {
  //           criterionId: 4,
  //           grade: 4.7,
  //           justification: 'Quick learning.',
  //         },
  //       ],
  //     },
  //   },
  // ];

  // const peerReviews = await Promise.all(
  //   peerReviewsData.map(review => prisma.peerReview.create({ data: review }))
  // );

  // Seed for Equalization
//   const equalizationsData = [
//     {
//       evaluatorId: users[5].id,  // Admin user
//       evaluatedId: users[0].id,
//       cycleId: cycle.id,
//       date: new Date(),
//       finalGrade: 4.3,
//     },
//     {
//       evaluatorId: users[5].id,  // Admin user
//       evaluatedId: users[1].id,
//       cycleId: cycle.id,
//       date: new Date(),
//       finalGrade: 4.0,
//     },
//   ];

//   const equalizations = await Promise.all(
//     equalizationsData.map(equalization => prisma.equalization.create({ data: equalization }))
//   );

//   console.log({ users, criteria, cycle, selfAssessments, peerReviews, equalizations });
}

main()
  // .catch((e) => {
  //   console.error(e);
  //   process.exit(1);
  // })
  // .finally(async () => {
  //   await prisma.$disconnect();
  // });