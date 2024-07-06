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
      position: 'Desenvolvedor',
      profilePhoto: 'https://randomuser.me/api/portraits/men/35.jpg',
      address: {
        create: {
          street: 'Av. Rocket Lab',
          district: 'Centro',
          city: 'Recife',
          state: 'PE',
          country: 'Brasil',
          number: '999',
        },
      },
      phoneNumber: '+55 (81) 99999-1111',
      birthDate: new Date('1990-01-01'),
      sector: 'TI',
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
          street: 'Av. Rocket Lab',
          district: 'Centro',
          city: 'Recife',
          state: 'PE',
          country: 'Brasil',
          number: '999',
        },
      },
      phoneNumber: '+55 (81) 99999-2222',
      birthDate: new Date('1992-05-15'),
      sector: 'Design',
    },
    {
      email: 'eric@example.com',
      name: 'Eric',
      password: hashedPassword3,
      role: 'COLABORADOR',
      position: 'Gerente',
      profilePhoto: 'https://randomuser.me/api/portraits/men/36.jpg',
      address: {
        create: {
          street: 'Av. Rocket Lab',
          district: 'Centro',
          city: 'Recife',
          state: 'PE',
          country: 'Brasil',
          number: '999',
        },
      },
      phoneNumber: '+55 (81) 99999-3333',
      birthDate: new Date('1985-09-20'),
      sector: 'Gerência',
    },
    {
      email: 'breno@example.com',
      name: 'Breno',
      password: hashedPassword4,
      role: 'COLABORADOR',
      position: 'Engenheiro de QA',
      profilePhoto: 'https://randomuser.me/api/portraits/men/37.jpg',
      address: {
        create: {
          street: 'Av. Rocket Lab',
          district: 'Centro',
          city: 'Recife',
          state: 'PE',
          country: 'Brasil',
          number: '999',
        },
      },
      phoneNumber: '+55 (81) 99999-4444',
      birthDate: new Date('1988-11-12'),
      sector: 'QA',
    },
    {
      email: 'lucas@example.com',
      name: 'Lucas',
      password: hashedPassword5,
      role: 'COLABORADOR',
      position: 'Estudante',
      profilePhoto: 'https://randomuser.me/api/portraits/men/39.jpg',
      address: {
        create: {
          street: 'Av. Rocket Lab',
          district: 'Centro',
          city: 'Recife',
          state: 'PE',
          country: 'Brasil',
          number: '999',
        },
      },
      phoneNumber: '+55 (81) 99999-5555',
      birthDate: new Date('1995-04-30'),
      sector: 'Educação',
    },
    {
      email: 'admin@example.com',
      name: 'Usuário Admin',
      password: hashedPasswordAdmin,
      role: 'SOCIO',
      position: 'Administração',
      profilePhoto: 'https://randomuser.me/api/portraits/women/40.jpg',
      address: {
        create: {
          street: 'Av. Rocket Lab',
          district: 'Centro',
          city: 'Recife',
          state: 'PE',
          country: 'Brasil',
          number: '999',
        },
      },
      phoneNumber: '+55 (81) 99999-6666',
      birthDate: new Date('1980-03-25'),
      sector: 'Administração',
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
  const cyclesData = [
    {
      name: 'Ciclo 1',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-12-31'),
      finalGrade: 4.5,
    },
    {
      name: 'Ciclo 2',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-07-01'),
      finalGrade: 4.1,
    },
    {
      name: 'Ciclo 3',
      startDate: new Date('2024-07-02'),
      endDate: new Date('2025-01-02'),
    },
  ];

  // Create cycles sequentially
  const cycles = [];
  for (const cycleData of cyclesData) {
    const cycle = await prisma.cycle.create({ data: cycleData });
    cycles.push(cycle);
  }

  // Ensure cycles are created in the correct order
  console.log('Created cycles:', cycles);

  // Update status of cycles 1 and 2 to false using Promise.all
  await Promise.all([
    prisma.cycle.update({
      where: { id: cycles[0].id },
      data: { status: false },
    }),
    prisma.cycle.update({
      where: { id: cycles[1].id },
      data: { status: false },
    })
  ]);

  // Assuming you have a list of users
  const allUsers = await prisma.user.findMany();

  // Helper function to generate a random grade between 3 and 5
  const getRandomGrade = () => parseInt((Math.random() * 2 + 3).toFixed(1));

  // SelfAssessment template data with random grades
  const selfAssessmentTemplate = (userId: number, cycleId: number) => ({
    userId,
    cycleId,
    date: new Date(),
    meanGrade: 4.5,
    SelfAssessmentScores: {
      create: [
        {
          criterionId: 1,
          grade: getRandomGrade(),
          justification: 'Bom desempenho no critério 1.',
        },
        {
          criterionId: 2,
          grade: getRandomGrade(),
          justification: 'Trabalho em equipe sólido no critério 2.',
        },
        {
          criterionId: 3,
          grade: getRandomGrade(),
          justification: 'Ótimas habilidades organizacionais no critério 3.',
        },
        {
          criterionId: 4,
          grade: getRandomGrade(),
          justification: 'Boa capacidade de aprendizado no critério 4.',
        },
        {
          criterionId: 5,
          grade: getRandomGrade(),
          justification: 'Jogador de equipe no critério 5.',
        },
        {
          criterionId: 6,
          grade: getRandomGrade(),
          justification: 'Entregou com qualidade no critério 6.',
        },
        {
          criterionId: 7,
          grade: getRandomGrade(),
          justification: 'Atendeu aos prazos no critério 7.',
        },
        {
          criterionId: 8,
          grade: getRandomGrade(),
          justification: 'Fez mais com menos no critério 8.',
        },
        {
          criterionId: 9,
          grade: getRandomGrade(),
          justification: 'Pensou fora da caixa no critério 9.',
        },
      ],
    },
  });

  // Create self-assessments for cycles[0] and cycles[1] for all users
  const selfAssessmentsData = [];
  allUsers.forEach(user => {
    selfAssessmentsData.push(selfAssessmentTemplate(user.id, cycles[0].id));
    selfAssessmentsData.push(selfAssessmentTemplate(user.id, cycles[1].id));
  });

  // Create self-assessments for cycles[2] for some users (e.g., first half of the list)
  const someUsers = allUsers.slice(0, Math.ceil(allUsers.length / 2));
  someUsers.forEach(user => {
    selfAssessmentsData.push(selfAssessmentTemplate(user.id, cycles[2].id));
  });

  const selfAssessments = await Promise.all(
    selfAssessmentsData.map(assessment => prisma.selfAssessment.create({ data: assessment }))
  );

  const peerReviewTemplate = (evaluatorId, evaluatedId, cycleId, meanGrade) => ({
    evaluatorId,
    evaluatedId,
    cycleId,
    meanGrade,
    isFinished: true,
    PeerReviewScores: {
      create: {
        behavior: Math.floor(Math.random() * 5) + 1,
        tecniques: Math.floor(Math.random() * 5) + 1,
        toImprove: 'Precisa melhorar em algumas áreas.',
        toPraise: 'Bom desempenho em aspectos específicos.',
      },
    },
  });

  const peerReviewsData = [];
  allUsers.forEach(evaluator => {
    allUsers.forEach(evaluated => {
      if (evaluator.id !== evaluated.id) {
        peerReviewsData.push(peerReviewTemplate(evaluator.id, evaluated.id, cycles[0].id, Number(getRandomGrade())));
        peerReviewsData.push(peerReviewTemplate(evaluator.id, evaluated.id, cycles[1].id, Number(getRandomGrade())));
      }
    });
  });

  const someUsersCycle3 = allUsers.slice(0, Math.ceil(allUsers.length / 2)); // Exemplo: metade dos usuários
  someUsersCycle3.forEach(evaluator => {
    someUsersCycle3.forEach(evaluated => {
      if (evaluator.id !== evaluated.id) {
        peerReviewsData.push(peerReviewTemplate(evaluator.id, evaluated.id, cycles[2].id, Number(getRandomGrade())));
      }
    });
  });

  const createdPeerReviews = await Promise.all(
    peerReviewsData.map(review => prisma.peerReview.create({ data: review }))
  );

  console.log({ users, criteria, cycles, selfAssessments /* , peerReviews, equalizations */ });

  const cycleEqualizationsData = [
    {
      name: 'Equalização 1',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-07-01'),
    },
    {
      name: 'Equalização 2',
      startDate: new Date('2024-07-02'),
      endDate: new Date('2025-01-02'),
    },
  ];

  // Create cycle equalizations
  const createdCycleEqualizations = await Promise.all(
    cycleEqualizationsData.map(async (cycleData, index) => {
      const createdCycleEqualization = await prisma.cycleEqualization.create({
        data: cycleData,
      });

      console.log(`Created cycle equalization: ${createdCycleEqualization.name}`);

      // Encontrar o índice do usuário com role 'SOCIO'
      const socioIndex = users.findIndex(user => user.role === 'SOCIO');

      // Create equalizations for users based on the cycle
      const usersToCreateEqualizations = index === 0 ? users : users.slice(0, Math.ceil(users.length / 2));

      const equalizationsData = usersToCreateEqualizations.map(user => ({
        evaluatorId: users[socioIndex].id,
        evaluatedId: user.id,
        cycleId: cycles[index].id,
        cycleEqualizationId: createdCycleEqualization.id,
        date: new Date(),
        status: true, // Adjust status as needed
        finalGrade: 4.5, // Adjust final grade as needed
      }));

      const createdEqualizations = await Promise.all(
        equalizationsData.map(equalization => prisma.equalization.create({ data: equalization }))
      );

      console.log(`Created equalizations for ${createdCycleEqualization.name}: ${createdEqualizations.length}`);

      return createdCycleEqualization;
    })
  );

  console.log('Created cycle equalizations:', createdCycleEqualizations);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
