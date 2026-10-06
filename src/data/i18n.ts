import { Language } from '../types';

export const praiseWords: Record<Language, string[]> = {
  uz: ['Barakalla! 🌟', 'Ofarin! 👏', 'Juda zo‘r! 🎉', 'Qoyil! ✨', 'Ajoyib! 🎈', 'Aqllisan! 💖'],
  ru: ['Молодец! 🌟', 'Отлично! 👏', 'Замечательно! 🎉', 'Браво! ✨', 'Умница! 🎈', 'Супер! 💖'],
  en: ['Great job! 🌟', 'Well done! 👏', 'Super star! 🎉', 'Awesome! ✨', 'Brilliant! 🎈', 'Fantastic! 💖'],
};

export const tryAgainWords: Record<Language, string> = {
  uz: 'Yana bir urinib ko‘r! Dino senga ishonadi 🦖',
  ru: 'Попробуй ещё раз! Дино верит в тебя 🦖',
  en: 'Try again! Dino believes in you 🦖',
};

export const UI_TEXT = {
  header: {
    title: {
      uz: 'Kelajak soati',
      ru: 'Час будущего',
      en: 'Future Hour',
    },
    topic: {
      uz: '6-mavzu: Oiladan o‘rganganim — kasblar haqida',
      ru: 'Тема 6: Уроки семьи — профессии',
      en: 'Topic 6: Learned from Family — Professions',
    },
    program: {
      uz: 'Mehribon tarbiyachim – mening suyanchim',
      ru: 'Мой добрый воспитатель – моя опора',
      en: 'Kind Teacher – My Support',
    },
    stars: {
      uz: 'Yulduzlar',
      ru: 'Звёзды',
      en: 'Stars',
    },
    ageSelect: {
      uz: 'Yosh guruhi',
      ru: 'Возрастная группа',
      en: 'Age Group',
    },
    soundOn: {
      uz: 'Ovoz yoqilgan',
      ru: 'Звук включен',
      en: 'Sound on',
    },
    soundOff: {
      uz: 'Ovoz o‘chirilgan',
      ru: 'Звук выключен',
      en: 'Sound muted',
    },
    fullscreen: {
      uz: 'To‘liq ekran',
      ru: 'На весь экран',
      en: 'Fullscreen',
    },
    teacherLock: {
      uz: 'Tarbiyachi paneli (3 soniya bosib turing)',
      ru: 'Панель воспитателя (удерживайте 3 сек)',
      en: 'Teacher Panel (hold 3s to open)',
    },
  },
  lessonPath: {
    backToMap: {
      uz: 'Bosh sahifaga qaytish',
      ru: 'Назад к карте',
      en: 'Back to Map',
    },
    nextStep: {
      uz: 'Keyingi bosqich',
      ru: 'Следующий шаг',
      en: 'Next Step',
    },
    movementBreakBtn: {
      uz: '🎵 Kasblar raqsi (charchoqni yozish)',
      ru: '🎵 Танец профессий (разминка)',
      en: '🎵 Profession Dance (break)',
    },
    coloringBtn: {
      uz: '🖍 Rasmni bo‘yash',
      ru: '🖍 Раскраска',
      en: '🖍 Coloring Fun',
    },
    step1Title: {
      uz: '1. Salomlashuv',
      ru: '1. Приветствие',
      en: '1. Greeting',
    },
    step1Desc: {
      uz: 'Dino bilan salomlashish va o‘tgan haftani eslash',
      ru: 'Приветствие с Дино и повторение недели 1',
      en: 'Greet Dino and recall Week 1',
    },
    step2Title: {
      uz: '2. Mening buyumim',
      ru: '2. Мой предмет',
      en: '2. Show-and-Tell',
    },
    step2Desc: {
      uz: 'Uydan keltirilgan buyumni do‘stlarga tanishtirish',
      ru: 'Показ предметов из дома и рассказ о профессии',
      en: 'Show-and-tell items brought from home',
    },
    step3Title: {
      uz: '3. O‘yin: Buyum kimga kerak?',
      ru: '3. Игра: Кому нужен предмет?',
      en: '3. Game: Who Needs the Tool?',
    },
    step3Desc: {
      uz: 'Buyumni tegishli kasb egasiga yetkazish',
      ru: 'Перетяни или нажми на нужную профессию',
      en: 'Match the tool to the right worker',
    },
    step4Title: {
      uz: '4. O‘yin: To‘g‘ri juftlik',
      ru: '4. Игра: Найди пару',
      en: '4. Game: Match the Pairs',
    },
    step4Desc: {
      uz: 'Xotira kartalari va chiziq bilan bog‘lash',
      ru: 'Карточки памяти и соединение линиями',
      en: 'Memory card flip and line matching',
    },
    step5Title: {
      uz: '5. O‘yin: Kim nima qiladi?',
      ru: '5. Игра: Кто что делает?',
      en: '5. Game: Who Does What?',
    },
    step5Desc: {
      uz: 'Kasb egalarining harakatlarini topish',
      ru: 'Определи действие каждой профессии',
      en: 'Pick the right action for the worker',
    },
    step6Title: {
      uz: '6. Bonus: Kasbni ovozidan top',
      ru: '6. Бонус: Угадай по звуку',
      en: '6. Bonus: Guess by Sound',
    },
    step6Desc: {
      uz: 'Tovushlarni tinglab kasbni topish',
      ru: 'Слушай звуки и угадывай профессию',
      en: 'Listen to audio clues and guess worker',
    },
    step7Title: {
      uz: '7. Men tanlagan kasb',
      ru: '7. Моя будущая профессия',
      en: '7. Dream Profession',
    },
    step7Desc: {
      uz: 'Kiyintirish, orzudagi kasb va umumiy devor',
      ru: 'Одень персонажа и добавь на стену дружбы',
      en: 'Dress up avatar and join the group wall',
    },
    step8Title: {
      uz: '8. Yakuniy refleksiya',
      ru: '8. Итоги и настроение',
      en: '8. Final Reflection',
    },
    step8Desc: {
      uz: 'Kayfiyat so‘rovi va faxriy medal olish',
      ru: 'Оценка занятия и медаль знатока',
      en: 'Mood check and badge of achievement',
    },
    step9Title: {
      uz: '9. 3-haftaga tayyorlov',
      ru: '9. Подготовка к неделе 3',
      en: '9. Next Week Teaser',
    },
    step9Desc: {
      uz: 'Rolli o‘yinlar burchagi va qiziq syujetlar',
      ru: 'Сюжетно-ролевые уголки в группе',
      en: 'Role-play corners preview',
    },
  },
  greeting: {
    dinoSpeech: {
      uz: 'Assalomu alaykum, bolajonlar! Bugun uyda tayyorlab kelgan qiziq narsalarni bir-birimizga ko‘rsatamiz.',
      ru: 'Здравствуйте, ребята! Сегодня мы покажем друг другу интересные вещи, которые приготовили дома.',
      en: 'Hello, wonderful children! Today we will show each other the exciting things we learned at home.',
    },
    recallQuestion: {
      uz: 'O‘tgan hafta Dino katta bo‘lish uchun nima kerak degan edi?',
      ru: 'Что Дино говорил на прошлой неделе: что нужно делать, чтобы вырасти?',
      en: 'What did Dino say last week: what do you need to grow up?',
    },
    optCorrect: {
      uz: 'O‘rganish kerak! 📚',
      ru: 'Учиться и исследовать! 📚',
      en: 'Learn and discover! 📚',
    },
    optWrong: {
      uz: 'Faqat uxlash kerak 😴',
      ru: 'Только всё время спать 😴',
      en: 'Just sleep all day 😴',
    },
    successTitle: {
      uz: 'Ofarin, to‘g‘ri esladingiz!',
      ru: 'Браво, вы отлично всё помните!',
      en: 'Bravo, you remembered correctly!',
    },
    successDesc: {
      uz: 'Katta bo‘lish va orzularga erishish uchun o‘rganish kerak! Bugun oilamizdan kasblar haqida nimalarni o‘rganganimizni gaplashamiz.',
      ru: 'Чтобы вырасти и исполнить мечту, нужно учиться! Сегодня мы поговорим о профессиях наших семей.',
      en: 'To grow up and reach our dreams, we need to learn! Today we explore the professions in our families.',
    },
  },
  showAndTell: {
    title: {
      uz: 'Mening buyumim — Oiladan o‘rganganim',
      ru: 'Мой предмет — Уроки моей семьи',
      en: 'My Object — Learned from Family',
    },
    spinTitle: {
      uz: 'Kim birinchi gapiradi? 🎡',
      ru: 'Кто первый отвечает? 🎡',
      en: 'Who speaks first? 🎡',
    },
    spinBtn: {
      uz: 'G‘ildirakni aylantirish!',
      ru: 'Крутить колесо!',
      en: 'Spin the wheel!',
    },
    spinWinner: {
      uz: 'Navbat:',
      ru: 'Очередь:',
      en: 'Turn for:',
    },
    timerLabel: {
      uz: 'Vaqt (qum soati)',
      ru: 'Время (песочные часы)',
      en: 'Visual Sand Clock',
    },
    startTimer: {
      uz: 'Vaqtni boshlash ▶',
      ru: 'Старт времени ▶',
      en: 'Start Timer ▶',
    },
    pauseTimer: {
      uz: 'To‘xtatish ⏸',
      ru: 'Пауза ⏸',
      en: 'Pause ⏸',
    },
    resetTimer: {
      uz: 'Qayta o‘rnatish ↺',
      ru: 'Сброс ↺',
      en: 'Reset ↺',
    },
    prompt1: {
      uz: '1. Bu nima?',
      ru: '1. Что это за предмет?',
      en: '1. What is this tool?',
    },
    prompt2: {
      uz: '2. Kimga kerak?',
      ru: '2. Кому он нужен?',
      en: '2. Who needs it?',
    },
    prompt3: {
      uz: '3. Nima qiladi?',
      ru: '3. Что делает этот специалист?',
      en: '3. What does this worker do?',
    },
    prompt4: {
      uz: '4. Nega shu kasbni tanlading?',
      ru: '4. Почему тебе нравится эта профессия?',
      en: '4. Why did you pick this profession?',
    },
    noHomeworkBtn: {
      uz: '🎒 Uy vazifam yo‘q (Kartadan tanlash)',
      ru: '🎒 Нет предмета из дома (Выбрать карточку)',
      en: '🎒 No object brought (Pick a ready card)',
    },
    noHomeworkModalTitle: {
      uz: 'Hechqisi yo‘q! O‘zingga yoqqan kasb kartasini tanla:',
      ru: 'Ничего страшного! Выбери любую понравившуюся карточку:',
      en: 'No worries at all! Pick any favorite card to share:',
    },
    applauseBtn: {
      uz: '👏 Barakalla! (Qarsaklar)',
      ru: '👏 Молодец! (Аплодисменты)',
      en: '👏 Well done! (Applause)',
    },
    listenerSticker: {
      uz: 'Do‘stimni tingladim 👂',
      ru: 'Я внимательно слушал друга 👂',
      en: 'I listened to my friend 👂',
    },
    listenersRewarded: {
      uz: 'Hamma diqqat bilan tingladi! Tinglash ham katta mahorat.',
      ru: 'Все слушали очень внимательно! Умение слушать — важный навык.',
      en: 'Everyone listened politely! Listening is a great skill.',
    },
  },
  game1: {
    title: {
      uz: '1-O‘yin: Bu buyum kimga kerak?',
      ru: 'Игра 1: Кому нужен этот предмет?',
      en: 'Game 1: Who Needs This Tool?',
    },
    dragInstruction: {
      uz: 'Buyumni to‘g‘ri kasb egasiga suring yoki ustiga bosing!',
      ru: 'Перетяни предмет к нужной профессии или нажми на неё!',
      en: 'Drag the tool to the right worker or tap on it!',
    },
    hintBtn: {
      uz: '💡 Yordam (Ikkita variant qoldirish)',
      ru: '💡 Подсказка (Оставить 2 варианта)',
      en: '💡 Hint (Leave 2 choices)',
    },
    matchSuccess: {
      uz: 'To‘g‘ri topildi!',
      ru: 'Правильно найдено!',
      en: 'Correct match!',
    },
  },
  game2: {
    title: {
      uz: '2-O‘yin: To‘g‘ri juftlikni top',
      ru: 'Игра 2: Найди правильную пару',
      en: 'Game 2: Match the Pairs',
    },
    modeFlip: {
      uz: '🃏 Xotira kartalari',
      ru: '🃏 Карточки памяти',
      en: '🃏 Memory Cards',
    },
    modeLines: {
      uz: '✏️ Chiziq bilan bog‘lash',
      ru: '✏️ Соедини линиями',
      en: '✏️ Connect Lines',
    },
    matchedCount: {
      uz: 'Topilgan juftliklar:',
      ru: 'Найдено пар:',
      en: 'Matched pairs:',
    },
    whyQuestion: {
      uz: '🎤 Nega shu buyumni tanlading? Do‘stlaringga aytib ber!',
      ru: '🎤 Почему ты выбрал этот предмет? Расскажи друзьям!',
      en: '🎤 Why did you choose this tool? Tell your classmates!',
    },
  },
  game3: {
    title: {
      uz: '3-O‘yin: Kim nima qiladi?',
      ru: 'Игра 3: Кто что делает?',
      en: 'Game 3: Who Does What?',
    },
    questionPrefix: {
      uz: 'nima qiladi?',
      ru: 'что делает?',
      en: 'what does this worker do?',
    },
    actionDone: {
      uz: 'Barcha savollarga to‘g‘ri javob berildi!',
      ru: 'Все вопросы пройдены на отлично!',
      en: 'All actions identified successfully!',
    },
  },
  game4: {
    title: {
      uz: '4-O‘yin: Kasbni ovozidan top',
      ru: 'Игра 4: Угадай профессию по звуку',
      en: 'Game 4: Guess by Sound',
    },
    listenBtn: {
      uz: '🔊 Tovushni tinglash',
      ru: '🔊 Послушать звук',
      en: '🔊 Listen to Sound',
    },
    instruction: {
      uz: 'Tugmani bosing, qiziq tovushni eshiting va kasbni toping!',
      ru: 'Нажми кнопку, послушай звук и угадай профессию!',
      en: 'Tap the button, listen closely and guess the profession!',
    },
    revealedTitle: {
      uz: 'To‘g‘ri, bu —',
      ru: 'Правильно, это —',
      en: 'Correct, this is —',
    },
  },
  dream: {
    title: {
      uz: 'Men tanlagan kasb — Orzudagi kasbim',
      ru: 'Моя будущая профессия — Кем я хочу стать',
      en: 'My Dream Profession',
    },
    subtitle: {
      uz: 'Katta bo‘lganingda kim bo‘lishni xohlaysan? O‘z qahramoningni kiyintir!',
      ru: 'Кем ты хочешь стать, когда вырастешь? Одень своего персонажа!',
      en: 'What do you want to be when you grow up? Dress up your character!',
    },
    nameInput: {
      uz: 'Bolaning ismi:',
      ru: 'Имя ребёнка:',
      en: 'Child name:',
    },
    characterType: {
      uz: 'Qahramon ko‘rinishi:',
      ru: 'Внешность:',
      en: 'Avatar look:',
    },
    selectProfession: {
      uz: 'Kasbni tanlang:',
      ru: 'Выбери профессию:',
      en: 'Select profession:',
    },
    sentenceStarter: {
      uz: 'Men bo‘lmoqchiman, chunki',
      ru: 'Я хочу стать им, потому что',
      en: 'I want to be this because',
    },
    addToWallBtn: {
      uz: '⭐ Kasblar devoriga ilish!',
      ru: '⭐ Добавить на стену профессий!',
      en: '⭐ Add to Wall of Dreams!',
    },
    wallTitle: {
      uz: 'Bizning guruhning "Kasblar devori"',
      ru: 'Стена профессий нашей группы',
      en: 'Our Group Profession Wall',
    },
    mottoBanner: {
      uz: '🌟 Har bir kasb muhim va foydali! Har bir insonning mehnati qadrli.',
      ru: '🌟 Каждая профессия важна и нужна! Труд каждого человека ценен.',
      en: '🌟 Every profession is important and valuable! Everyone’s work matters.',
    },
  },
  reflection: {
    title: {
      uz: 'Yakuniy refleksiya va medal',
      ru: 'Итоги занятия и медаль',
      en: 'Final Reflection & Medal',
    },
    question1: {
      uz: '1. Bugun qanday qiziq narsalarni ko‘rsatdik?',
      ru: '1. Какие интересные предметы мы сегодня показали?',
      en: '1. What fascinating tools did we explore today?',
    },
    question2: {
      uz: '2. Do‘stimiz gapirayotganda biz nima qildik?',
      ru: '2. Что мы делали, когда говорил наш друг?',
      en: '2. What did we do while our friend spoke?',
    },
    answer2: {
      uz: '👂 Diqqat bilan tingladik va hurmat qildik!',
      ru: '👂 Внимательно слушали и поддерживали!',
      en: '👂 Listened carefully and respected each other!',
    },
    question3: {
      uz: '3. Qaysi kasb senga eng ko‘p yoqdi?',
      ru: '3. Какая профессия тебе больше всего понравилась?',
      en: '3. Which profession did you like the most?',
    },
    moodTitle: {
      uz: 'Bugungi mashg‘ulot qanday o‘tdi? Kayfiyatni belgilang:',
      ru: 'Как прошло сегодняшнее занятие? Выберите настроение:',
      en: 'How was today’s lesson? Tap your mood:',
    },
    moodGreat: {
      uz: '😀 Juda zo‘r!',
      ru: '😀 Замечательно!',
      en: '😀 Amazing!',
    },
    moodGood: {
      uz: '🙂 Yaxshi',
      ru: '🙂 Хорошо',
      en: '🙂 Good',
    },
    moodOkay: {
      uz: '😐 O‘rtacha',
      ru: '😐 Нормально',
      en: '😐 Okay',
    },
    finalMotto: {
      uz: 'O‘rganish uchun gapirish ham, tinglash ham kerak! 🎈',
      ru: 'Чтобы учиться новому, нужно и говорить, и внимательно слушать! 🎈',
      en: 'To learn together, we need to speak and listen with care! 🎈',
    },
    downloadMedalBtn: {
      uz: '🏅 "Kasblar bilimdoni" medalini yuklab olish (PNG)',
      ru: '🏅 Скачать цифровую медаль знатока (PNG)',
      en: '🏅 Download "Master of Professions" Medal (PNG)',
    },
    printMedalBtn: {
      uz: '🖨 Medalni chop etish',
      ru: '🖨 Распечатать медаль',
      en: '🖨 Print Medal',
    },
  },
  nextWeek: {
    title: {
      uz: '3-Haftaga tayyorlov: Rolli o‘yinlar',
      ru: 'Подготовка к неделе 3: Ролевые игры',
      en: 'Week 3 Preview: Role-Playing Games',
    },
    description: {
      uz: 'Keyingi safar kasblarni rolli o‘yinda sinab ko‘ramiz! Kim shifokor, kim oshpaz, kim ustoz bo‘lishni xohlaydi — o‘ylab keling.',
      ru: 'В следующий раз мы примерим профессии в сюжетно-ролевой игре! Подумайте дома, кем вы хотите быть — врачом, поваром или учителем.',
      en: 'Next time we will act out professions in real role-play games! Think about who you want to be — a doctor, chef, or teacher.',
    },
    cornerHospital: {
      uz: '🏥 Shifoxona burchagi: oq xalat, stetoskop va dori qutisi',
      ru: '🏥 Уголок больницы: белый халат, стетоскоп и аптечка',
      en: '🏥 Clinic corner: white coat, stethoscope, first aid kit',
    },
    cornerKitchen: {
      uz: '🍳 Oshxona burchagi: oshpaz qalpoqchasi, idishlar va sabzavotlar',
      ru: '🍳 Уголок кухни: колпак шефа, кастрюльки и овощи',
      en: '🍳 Kitchen corner: chef hat, play pots, vegetables',
    },
    cornerSchool: {
      uz: '🏫 Sinf burchagi: doska, kitoblar va sinf qo‘ng‘irog‘i',
      ru: '🏫 Уголок школы: доска, книги и звонок',
      en: '🏫 Classroom corner: board, books, school bell',
    },
  },
  danceBreak: {
    title: {
      uz: 'Kasblar raqsi — 1 daqiqalik quvnoq harakat!',
      ru: 'Танец профессий — 1 минута весёлой разминки!',
      en: 'Profession Dance — 1 Minute Fun Movement!',
    },
    actionBuilder: {
      uz: '👷 G‘isht teramiz va bolg‘a uramiz! (Bir, ikki, uch!)',
      ru: '👷 Строим дом и стучим молотком! (Раз, два, три!)',
      en: '👷 Building houses and tap-tap hammer! (1, 2, 3!)',
    },
    actionChef: {
      uz: '👨‍🍳 Katta qozonda mazali sho‘rvani aralashtiramiz!',
      ru: '👨‍🍳 Мешаем вкусный суп в большой кастрюле!',
      en: '👨‍🍳 Stirring delicious soup in a giant pot!',
    },
    actionDriver: {
      uz: '🚌 Rulni ushlab, chapga va o‘ngga buramiz!',
      ru: '🚌 Держим руль и поворачиваем влево-вправо!',
      en: '🚌 Holding the wheel, turning left and right!',
    },
    actionTailor: {
      uz: '🧵 Qaychida qirqamiz va chiroyli kiyim tikamiz!',
      ru: '🧵 Режем ножницами и шьём красивое платье!',
      en: '🧵 Snipping scissors and stitching neat clothes!',
    },
    actionFire: {
      uz: '🧑‍🚒 Suv sepgichni yo‘naltirib, olovni o‘chiramiz! Psh-sh-sh!',
      ru: '🧑‍🚒 Направляем шланг и тушим огонь! Пш-ш-ш!',
      en: '🧑‍🚒 Aiming the hose and spraying water! Whoosh!',
    },
    closeBtn: {
      uz: 'Raqs tugadi, darsga qaytamiz! ✨',
      ru: 'Разминка окончена, продолжаем! ✨',
      en: 'Dance finished, let’s continue! ✨',
    },
  },
  coloring: {
    title: {
      uz: 'Kasblar rasmini bo‘yash',
      ru: 'Раскраска профессий',
      en: 'Color the Professions',
    },
    instruction: {
      uz: 'Rangni tanlang va rasm ustiga bosing!',
      ru: 'Выбери цвет и нажми на часть картинки!',
      en: 'Select a color and tap any part to fill!',
    },
    clearBtn: {
      uz: 'Tozalash ↺',
      ru: 'Очистить ↺',
      en: 'Clear ↺',
    },
    closeBtn: {
      uz: 'Yopish',
      ru: 'Закрыть',
      en: 'Close',
    },
  },
  teacherPanel: {
    title: {
      uz: 'Tarbiyachi metodik paneli',
      ru: 'Методическая панель воспитателя',
      en: 'Teacher Methodological Panel',
    },
    tabGoals: {
      uz: '🎯 Maqsadlar',
      ru: '🎯 Цели',
      en: '🎯 Goals',
    },
    tabChecklist: {
      uz: '✅ Natijalar',
      ru: '✅ Результаты',
      en: '✅ Outcomes',
    },
    tabAgeTips: {
      uz: '👶 Yosh tavsiyalari',
      ru: '👶 Возрастные советы',
      en: '👶 Age Tips',
    },
    tabTimer: {
      uz: '⏱ Dars vaqti',
      ru: '⏱ Таймер занятия',
      en: '⏱ Lesson Timer',
    },
    tabPrint: {
      uz: '🖨 Chop etish (A4)',
      ru: '🖨 Печать карточек',
      en: '🖨 Print Cards',
    },
    tabParents: {
      uz: '💌 Ota-onalarga xat',
      ru: '💌 Родителям',
      en: '💌 Parent Note',
    },
    tabSettings: {
      uz: '⚙️ Sozlamalar',
      ru: '⚙️ Настройки',
      en: '⚙️ Settings',
    },
    goalsEdu: {
      uz: 'Ta’limiy maqsad: oilada kasblar haqida olgan ma’lumotni guruhda eslash, nomlash va aytib berish.',
      ru: 'Образовательная цель: вспомнить полученные дома знания о профессиях и рассказать о них в группе.',
      en: 'Educational goal: recall, name, and describe family profession knowledge in group sharing.',
    },
    goalsUpbr: {
      uz: 'Tarbiyaviy maqsad: kattalar mehnatiga, barcha kasblarga va boshqalarning fikriga hurmatni rivojlantirish.',
      ru: 'Воспитательная цель: формировать уважение к труду взрослых, равенству всех профессий и мнению сверстников.',
      en: 'Moral goal: cultivate respect for adult work, equality of all professions, and peer listening.',
    },
    goalsDev: {
      uz: 'Rivojlantiruvchi maqsad: ko‘rsatish, nomlash, qisqa gapirish, tinglash, savolga javob berish va tanlovini izohlash.',
      ru: 'Развивающая цель: развивать навыки показа, называния предметов, связной речи, слушания и аргументации.',
      en: 'Developmental goal: foster show-and-tell, naming, concise speaking, active listening, and simple reasoning.',
    },
    ageTips34: {
      uz: '🐣 3–4 yosh: Faqat 2–3 ta asosiy kasb (shifokor, oshpaz, quruvchi). Rasmga ko‘proq tayaning. 1–2 so‘zli javoblar yetarli. "Bu oshpazgami yoki shifokorgami?" deb 2 ta variantli savol bering. Taqdimot vaqti: 10–20 soniya.',
      ru: '🐣 3–4 года: 2–3 базовые профессии. Опора на крупные картинки. Достаточно ответа в 1–2 слова. Вопрос с подсказкой из 2 вариантов. Таймер 10–20 сек.',
      en: '🐣 3–4 years: 2–3 core professions. Picture-first emphasis. 1–2 word answers are enough. Give 2-choice hints. Presentation timer 10–20s.',
    },
    ageTips45: {
      uz: '🐥 4–5 yosh: 3–4 ta kasb juftligi. "Nima qiladi?" savoli kiritiladi. Bola bitta sodda gap tuza olsin ("Bu qoshiq. Oshpazga kerak."). Taqdimot vaqti: 20–30 soniya.',
      ru: '🐥 4–5 лет: 3–4 пары. Вопрос "Что делает?". Ребёнок строит простое предложение ("Это ложка. Она нужна повару."). Таймер 20–30 сек.',
      en: '🐥 4–5 years: 3–4 pairs. Introduce "What do they do?". Simple single sentence structure. Presentation timer 20–30s.',
    },
    ageTips56: {
      uz: '🦁 5–6 yosh: 5–9 ta kasb. Mustaqil bog‘lash, "Nega?" savollari. Tanlovini 1–2 jumlada izohlab berish. Taqdimot vaqti: 30–40 soniya.',
      ru: '🦁 5–6 лет: 5–9 пар. Самостоятельное сопоставление, вопрос "Почему?". Объяснение выбора в 1–2 предложениях. Таймер 30–40 сек.',
      en: '🦁 5–6 years: 5–9 pairs. Independent matching, "Why?" questions. Explaining reasons in 1–2 sentences. Presentation timer 30–40s.',
    },
    generalTips: {
      uz: 'Muhim qoidalar: Bolalarning keltirgan buyumini go‘zalligi yoki qimmatligi bo‘yicha baholamang; asosiy e’tibor faol ishtirokda. Uy vazifasi bo‘lmagan bolalarga darhol tayyor rasm kartasini bering (hech kim chetda qolmasin). Hech bir kasbni boshqasidan ustun qo‘ymang. O‘yinlarni qisqa va qiziqarli tuting.',
      ru: 'Важные правила: Не оценивайте сложность принесённой вещи; хвалите за участие. Детям без предмета сразу дайте карточку из набора. Не выделяйте профессии как «лучшие» или «худшие». Держите темп динамичным.',
      en: 'Crucial tips: Never judge brought items by complexity or cost; praise participation. Immediately offer ready picture cards to children who brought nothing. Never rank professions. Keep games brief and energetic.',
    },
    printNotice: {
      uz: 'Quyidagi tugma orqali 9 ta kasb va 9 ta buyum kartochkalarini A4 formatda chop etishingiz mumkin.',
      ru: 'Вы можете распечатать 9 карточек профессий и 9 инструментов на листе A4.',
      en: 'Print all 9 profession cards and 9 tools on standard A4 sheets.',
    },
    parentNoteText: {
      uz: 'Hurmatli ota-onalar! Ushbu haftada bolajonlarimiz bilan "Oiladan o‘rganganim — kasblar haqida" mavzusini o‘rgandik. Bolalar oila a’zolarining mehnati bilan faxrlanishni va barcha kasblarni hurmat qilishni o‘rganmoqda. Keyingi haftada biz guruhda rolli o‘yinlar (shifoxona, oshxona, maktab) o‘ynaymiz. Farzandingiz bilan uning orzusidagi kasb haqida uyda suhbatlashib, rolli o‘yinga mos kichik qahramonlik g‘oyasini o‘ylab ko‘rishingizni so‘raymiz!',
      ru: 'Уважаемые родители! На этой неделе мы изучали тему «Уроки семьи — профессии». Дети гордятся трудом близких и учатся уважать каждую профессию. На следующей неделе мы устроим сюжетно-ролевые игры (больница, кухня, школа). Поговорите дома с ребёнком о его мечте и приготовьтесь к весёлой игре!',
      en: 'Dear parents! This week our kindergarten class explored "Learned from Family — Professions". Children are learning to appreciate family work and respect all jobs equally. Next week we will host role-playing games (clinic, kitchen, classroom). Please talk at home about your child’s dream job and brainstorm costume ideas!',
    },
    closeBtn: {
      uz: 'Yopish ✕',
      ru: 'Закрыть ✕',
      en: 'Close ✕',
    },
  },
};
