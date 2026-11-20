import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// 15 OFFICIAL TEMPLE SEVAS DATA (Kannada: 0, English: 1, Hindi: 2)
// Sized slightly smaller with generous spacing between each card
// Plain color placeholders inside (ready for future images)
// Titles placed on TOP SIDE ONLY and made bigger
// -----------------------------------------------------------------------------
const POOJAS_DATA = [
  // 01: Circle (Low-mid on left)
  {
    id: 1,
    number: '01',
    price: '₹150',
    left: 100,
    top: 230,
    width: 200,
    height: 200,
    radius: 100,
    bgClass: 'bg-[#FFF9EE] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '52%',
    dotColor: '#1D6386',
    title: ['ಪೂರ್ಣಫಲ ಸೇವೆ', 'Poornaphala Seva', 'पूर्णफल सेवा'],
    curvedText: [
      '● ಪೂರ್ಣಫಲ ಸಮರ್ಪಣೆ • 16 ದಿನಗಳ ದೀಕ್ಷೆ',
      '● Poornaphala Seva • 16-Day Coconut Vow',
      '● पूर्णफल समर्पण • 16 दिवसीय संकल्प',
    ],
    description: [
      'ಶ್ರೀ ಕಾರ್ಯ ಸಿದ್ಧಿ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನದ ಜಗತ್ಪ್ರಸಿದ್ಧ 16 ದಿನಗಳ ಸಂಕಲ್ಪ ತೆಂಗಿನಕಾಯಿ ಕಟ್ಟುವ ಆಚರಣೆ. ಭಕ್ತರು ತಮ್ಮ ಆಶೋತ್ತರಗಳನ್ನು ಈಡೇರಿಸಿಕೊಳ್ಳಲು ದೇವಸ್ಥಾನದಲ್ಲಿ ತೆಂಗಿನಕಾಯಿ ಕಟ್ಟಿ, ದಿನವೂ 41 ಬಾರಿ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಿಸಿ 16 ದಿನಗಳ ಬಳಿಕ ದೀಕ್ಷೆ ಪೂರ್ಣಗೊಳಿಸುತ್ತಾರೆ.',
      'The famous 16-day wish-fulfilling coconut vow ritual unique to Girinagar. Devotees tie a sacred coconut with sankalpa within the sanctum and chant the Hanuman Chalisa 41 times daily for 16 days to seek divine grace.',
      'गिरिनगर मंदिर की विश्वविख्यात 16 दिवसीय नारियल संकल्प साधना। भक्त मंदिर में नारियल बांधकर प्रतिदिन 41 बार हनुमान चालीसा का पाठ करते हैं और 16वें दिन अपनी मनोकामना पूर्ण होने पर आभार व्यक्त करते हैं।',
    ],
  },

  // 02: Horizontal stadium (High, top-left)
  {
    id: 2,
    number: '02',
    price: '₹300',
    left: 360,
    top: 55,
    width: 400,
    height: 220,
    radius: 110,
    bgClass: 'bg-[#FDF6EA] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '8%',
    dotColor: '#1D6386',
    title: ['ವಡೇ ಹಾರ / ವಡಮಾಲ ಸೇವೆ', 'Vade Hara / Vada Mala', 'वड़ा माला सेवा'],
    curvedText: [
      '● ಶ್ರೀ ವಡಮಾಲ ಸೇವೆ • ಶನಿ-ರಾಹು ದೋಷ ನಿವಾರಣೆ',
      '● Sri Vada Mala Seva • Saturn Dosha Relief',
      '● श्री वड़ा माला सेवा • शनि दोष निवारण',
    ],
    description: [
      'ಹನುಮಂತನಿಗೆ ಅತ್ಯಂತ ಪ್ರಿಯವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಉದ್ದಿನ ವಡೆಗಳ ಹಾರವನ್ನು ಸಮರ್ಪಿಸುವ ವಿಶೇಷ ಸೇವೆ. ಶನಿ ಮಹಾರಾಜ ಹಾಗೂ ರಾಹು-ಕೇತು ಗ್ರಹದೋಷಗಳನ್ನು ಶಮನಗೊಳಿಸಿ, ಕಷ್ಟ ನಷ್ಟಗಳಿಂದ ಮುಕ್ತಿ ನೀಡಿ ಸಮೃದ್ಧಿಯನ್ನು ಕರುಣಿಸುತ್ತದೆ.',
      'Offering a traditional garland made of crisp savory black gram fritters to Lord Hanuman. This sacred seva pacifies Saturn (Shani) and Rahu-Ketu, dissolving obstacles and blessing the devotee with peace and prosperity.',
      'हनुमान जी को उड़द के वड़ों से बनी पवित्र माला अर्पित करने की पावन सेवा। इससे शनि और राहु-केतु के अनिष्ट प्रभावों की शांति होती है और जीवन में सुख-समृद्धि का वास होता है।',
    ],
  },

  // 03: Rounded horizontal capsule (Very low)
  {
    id: 3,
    number: '03',
    price: '₹300',
    left: 820,
    top: 300,
    width: 250,
    height: 180,
    radius: 90,
    bgClass: 'bg-[#FAF0E1] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '12%',
    dotColor: '#C79A45',
    title: ['ಪಂಚಾಮೃತ ಅಭಿಷೇಕ', 'Panchamruta Abhisheka', 'पंचामृत अभिषेक'],
    curvedText: [
      '● ಪಂಚಾಮೃತ ಅಭಿಷೇಕ • ಕ್ಷೀರ, ದಧಿ, ಘೃತ, ಮಧು',
      '● Panchamruta Abhisheka • 5 Sacred Liquids',
      '● पंचामृत अभिषेक • पांच पावन द्रव्य',
    ],
    description: [
      'ಹಾಲು, ಮೊಸರು, ಶುದ್ಧ ತುಪ್ಪ, ಜೇನುತುಪ್ಪ ಮತ್ತು ಸಕ್ಕರೆಯೆಂಬ ಐದು ಅಮೃತ ದ್ರವ್ಯಗಳಿಂದ ಹನುಮಂತನಿಗೆ ಮಾಡುವ ವೈದಿಕ ಮಹಾ ಅಭಿಷೇಕ. ಶರೀರ, ಮನಸ್ಸಿಗೆ ಶುದ್ಧತೆ ಮತ್ತು ದೈವಿಕ ತೇಜಸ್ಸನ್ನು ಕರುಣಿಸುತ್ತದೆ.',
      'Ritual bathing of the monolithic deity with five sacred liquids: pure cow milk, curd, ghee, honey, and raw sugar, accompanied by Vedic chantings for peace and spiritual upliftment.',
      'दूध, दही, घी, शहद और शर्करा—इन पांच पावन द्रव्यों से भगवान हनुमान का अभिषेक, जिससे शरीर, मन और आत्मा की शुद्धि होती है और दीर्घायु की प्राप्ति होती है।',
    ],
  },

  // 04: Circle (High)
  {
    id: 4,
    number: '04',
    price: 'ವಿಶೇಷ ಸೇವೆ',
    left: 1140,
    top: 50,
    width: 220,
    height: 220,
    radius: 110,
    bgClass: 'bg-[#FFF9EE] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#C79A45] text-[#30251F]',
    textOffset: '24%',
    dotColor: '#2A7B4C',
    title: ['ಕದಳೀ ಫಲ ಅರ್ಚನೆ', 'Kadali Phala Archana', 'कदली फल अर्चना'],
    curvedText: [
      '● ಕದಳೀ ಫಲ ಅರ್ಚನೆ • ಭಾನುವಾರದ ವಿಶೇಷ ಸೇವೆ',
      '● Kadali Phala Archana • Sunday Offering',
      '● कदली फल अर्चना • रविवार विशेष पूजा',
    ],
    description: [
      'ಶ್ರೀ ಹನುಮಂತನಿಗೆ ಭಾನುವಾರದಂದು ಮಾಡುವ ಪವಿತ್ರ ಬಾಳೆಹಣ್ಣು (ಕದಳೀ ಫಲ) ಅರ್ಪಣಾ ಸೇವೆ. ಕದಳೀವನ ಪ್ರಿಯನಾದ ಆಂಜನೇಯನಿಗೆ ಈ ಅರ್ಚನೆ ಸಲ್ಲಿಸುವುದರಿಂದ ಆಯಸ್ಸು, ಆರೋಗ್ಯ ಮತ್ತು ಮನಃಶಾಂತಿ ಲಭಿಸುತ್ತದೆ.',
      'Special banana offering ritual traditionally performed on Sundays. Bananas are exceptionally sacred to Lord Hanuman (Kadaleevana Nivasi), bestowing physical vigor, tranquility, and family peace.',
      'कदलीवन प्रिय हनुमान जी को रविवार के दिन केले (कदली फल) की विशेष माला और अर्चना अर्पित की जाती है, जिससे स्वास्थ्य और जीवन में स्थिरता आती है।',
    ],
  },

  // 05: Stadium (Low-center)
  {
    id: 5,
    number: '05',
    price: '₹800',
    left: 1430,
    top: 270,
    width: 390,
    height: 220,
    radius: 110,
    bgClass: 'bg-[#FDF6EA] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '55%',
    dotColor: '#2A7B4C',
    title: ['ವೀಳ್ಯದೆಲೆ ಅಲಂಕಾರ', 'Betel Leaves Alankara', 'पान पत्ता अलंकार'],
    curvedText: [
      '● ವೀಳ್ಯದೆಲೆ ಅಲಂಕಾರ ಸೇವೆ • ಸಕಲ ಭೀತಿ ನಿವಾರಕ',
      '● Betel Leaves Alankara • Fresh Leaf Garland',
      '● पान पत्ता अलंकार • भय निवारण',
    ],
    description: [
      '200 ಟನ್ ಏಕಶಿಲಾ ಹನುಮಂತನ ಮೂರ್ತಿಗೆ ಹಸಿರು ವೀಳ್ಯದೆಲೆಗಳ ಬೃಹತ್ ಮಾಲೆಗಳಿಂದ ಶೃಂಗಾರ ಮಾಡುವ ಅಪೂರ್ವ ಸೇವೆ. ಸೀತಾದೇವಿಯು ಲಂಕೆಯಲ್ಲಿ ಹನುಮಂತನಿಗೆ ವೀಳ್ಯದೆಲೆಯ ಮಾಲೆಯಿಂದ ಆಶೀರ್ವದಿಸಿದ ಪಾವಿತ್ರ್ಯವನ್ನು ಇದು ಸ್ಮರಿಸುತ್ತದೆ.',
      'Decoration using hundreds of fresh betel leaf garlands (Tamalapaku) to drape the massive 200-tonne monolithic idol. Commemorates Sita Devi blessing Hanuman with a betel leaf garland for bringing tidings of Sri Rama.',
      '200 टन की विशाल एकाश्म हनुमान प्रतिमा को ताजे पान के पत्तों (तामुल) की मालाओं से सजाया जाता है। माता सीता द्वारा हनुमान जी को दिए गए पावन आशीर्वाद का यह पावन प्रतीक है।',
    ],
  },

  // 06: Circle / Pill (Mid-height)
  {
    id: 6,
    number: '06',
    price: '₹1,500',
    left: 1890,
    top: 155,
    width: 230,
    height: 210,
    radius: 105,
    bgClass: 'bg-[#FAF0E1] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '12%',
    dotColor: '#D9483B',
    title: ['ಬೆಣ್ಣೆ & ಗಂಧ ಅಲಂಕಾರ', 'Butter & Gandha', 'नवनीत एवं गंध अलंकार'],
    curvedText: [
      '● ಬೆಣ್ಣೆ & ಗಂಧ ಅಲಂಕಾರ • ದೈವಿಕ ರಕ್ಷೆ',
      '● Butter & Gandha Alankara • Divine Grace',
      '● नवनीत एवं गंध अलंकार • दिव्य कृपा',
    ],
    description: [
      'ಹನುಮಂತನಿಗೆ ಅತ್ಯಂತ ಪ್ರಿಯವಾದ ಪರಿಶುದ್ಧ ತಾಜಾ ಬೆಣ್ಣೆ ಮತ್ತು ಶ್ರೀಗಂಧದಿಂದ ಮಾಡುವ ಪವಿತ್ರ ಮೂರ್ತಿ ಲೇಪನ ಸೇವೆ. ದೇಹಕ್ಕೆ ಶಾಂತಿ, ಶೀತಲತೆ ಮತ್ತು ದೈವಿಕ ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ.',
      'Complete deity decoration with freshly churned butter and cooling sandalwood paste (Gandha), bringing profound peace, tranquility, and freedom from negative afflictions.',
      'हनुमान जी को अत्यंत प्रिय ताजा मक्खन एवं सुगंधित चंदन से प्रतिमा का पावन लेपन, जिससे मानसिक शांति और सभी बाधाओं से मुक्ति मिलती है।',
    ],
  },

  // 07: Wide stadium (High)
  {
    id: 7,
    number: '07',
    price: '₹1,500',
    left: 2190,
    top: 50,
    width: 370,
    height: 210,
    radius: 105,
    bgClass: 'bg-[#FFF9EE] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '8%',
    dotColor: '#D9483B',
    title: ['ಸಿಂಧೂರ ಲೇಪನ ಸೇವೆ', 'Sindhoora Alankara', 'सिंदूर लेपन सेवा'],
    curvedText: [
      '● ಸಿಂಧೂರ ಲೇಪನ ಸೇವೆ • ನಕಾರಾತ್ಮಕ ಶಕ್ತಿ ನಿಗ್ರಹ',
      '● Sindhoora Alankara • Divine Armor',
      '● सिंदूर अलंकार • रक्षा कवच',
    ],
    description: [
      'ಹನುಮಂತನಿಗೆ ಅತ್ಯಂತ ಪ್ರಿಯವಾದ ಪರಿಶುದ್ಧ ಸಿಂಧೂರದಿಂದ ಮಾಡುವ ಸಂಪೂರ್ಣ ಮೂರ್ತಿ ಲೇಪನ ಸೇವೆ. ದೃಷ್ಟಿದೋಷ, ಕಂಟಕಗಳು ಮತ್ತು ನಕಾರಾತ್ಮಕ ಶಕ್ತಿಗಳನ್ನು ನಿವಾರಿಸಿ ದಿವ್ಯ ರಕ್ಷೆ ನೀಡುತ್ತದೆ.',
      'Sacred vermilion application to the monolithic idol. Shields devotees from evil eye, cures chronic ailments, and bestows boundless fortitude and victory.',
      'हनुमान जी को अत्यंत प्रिय पावन सिंदूर का लेपन, जिससे नकारात्मक ऊर्जा दूर होती है और हर क्षेत्र में विजय प्राप्त होती है।',
    ],
  },

  // 08: Circle (Low-mid)
  {
    id: 8,
    number: '08',
    price: '₹2,500',
    left: 2630,
    top: 280,
    width: 230,
    height: 230,
    radius: 115,
    bgClass: 'bg-[#FDF6EA] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#C79A45] text-[#30251F]',
    textOffset: '52%',
    dotColor: '#C79A45',
    title: ['ವಸ್ತ್ರ & ಕವಚ ಅಲಂಕಾರ', 'Vastra & Kavacha', 'वस्त्र एवं कवच अलंकार'],
    curvedText: [
      '● ವಸ್ತ್ರ & ಕವಚ ಅಲಂಕಾರ • ದೈವಿಕ ರಕ್ಷೆ',
      '● Vastra & Kavacha Alankara • Royal Grace',
      '● वस्त्र एवं कवच अलंकार • दिव्य रक्षा',
    ],
    description: [
      'ಭವ್ಯ ಏಕಶಿಲಾ ಹನುಮಂತನಿಗೆ ಭಕ್ತಿಪೂರ್ವಕವಾಗಿ ಪವಿತ್ರ ರೇಷ್ಮೆ ವಸ್ತ್ರ (ಉಡುಪು) ಮತ್ತು ಚಿನ್ನ/ಬೆಳ್ಳಿಯ ಅಲಂಕಾರಿಕ ಕವಚವನ್ನು ತೊಡಿಸಿ ಪೂಜಿಸುವ ಮಹೋನ್ನತ ರಾಜೋಪಚಾರ ಸೇವೆ.',
      'Adorning the magnificent monolithic idol with consecrated sacred silk robes (Vastra) and protective ornate armor plates (Kavacha). A regal seva signifying supreme surrender and receiving perpetual divine guardianship.',
      'भव्य एकाश्म प्रतिमा को पावन रेशमी वस्त्र एवं सुरक्षात्मक दिव्य कवच से सुसज्जित करने की राजोपचार सेवा, जिससे साधक को हर संकट से ईश्वरीय सुरक्षा प्राप्त होती है।',
    ],
  },

  // 09: Rounded horizontal capsule (High)
  {
    id: 9,
    number: '09',
    price: '₹500',
    left: 2940,
    top: 50,
    width: 240,
    height: 190,
    radius: 95,
    bgClass: 'bg-[#FFF9EE] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '12%',
    dotColor: '#1D6386',
    title: ['ಪಲ್ಲಕ್ಕಿ ಉತ್ಸವ', 'Pallakki Utsava', 'पालकी यात्रा सेवा'],
    curvedText: [
      '● ಪಲ್ಲಕ್ಕಿ ಉತ್ಸವ • ಮಂಗಲಕರ ಉತ್ಸವ ಮೆರವಣಿಗೆ',
      '● Pallakki Utsava • Palanquin Procession',
      '● पालकी यात्रा सेवा • मंगलकारी उत्सव',
    ],
    description: [
      'ಶ್ರಾವಣ ಮಾಸ ಹಾಗೂ ಹನುಮತ್ ಜಯಂತಿಯ ಶುಭ ಸಂದರ್ಭಗಳಲ್ಲಿ ದೇವಸ್ಥಾನದ ಪ್ರಾಕಾರದಲ್ಲಿ ನಡೆಯುವ ವೈಭವದ ಪಲ್ಲಕ್ಕಿ ಉತ್ಸವ ಸೇವೆ. ಕುಟುಂಬಕ್ಕೆ ಸೌಭಾಗ್ಯ ಮತ್ತು ಆರೋಗ್ಯ ತರುತ್ತದೆ.',
      'Sacred palanquin procession ritual conducted during Shravana Masa and holy festival days with Vedic chanting and traditional temple music.',
      'श्रावण मास एवं पावन पर्वों पर मंदिर परिसर में आयोजित होने वाली पालकी यात्रा, जो संपूर्ण परिवार के लिए मंगलकारी है।',
    ],
  },

  // 10: Horizontal stadium (Low)
  {
    id: 10,
    number: '10',
    price: '₹1,000',
    left: 3250,
    top: 280,
    width: 340,
    height: 200,
    radius: 100,
    bgClass: 'bg-[#FAF0E1] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#C79A45] text-[#30251F]',
    textOffset: '8%',
    dotColor: '#D9483B',
    title: ['ರಥೋತ್ಸವ ಸೇವೆ', 'Ratha Utsava', 'रथोत्सव सेवा'],
    curvedText: [
      '● ರಥೋತ್ಸವ ಸೇವೆ • ದೈವಿಕ ಆಶೀರ್ವಾದ',
      '● Ratha Utsava • Chariot Procession',
      '● रथोत्सव सेवा • पावन रथ यात्रा',
    ],
    description: [
      'ಹನುಮತ್ ಜಯಂತಿ ಮತ್ತು ವಾರ್ಷಿಕ ಜಾತ್ರೆಯಂದು ನಡೆಯುವ ವೈಭವೋಪೇತ ಬೃಹತ್ ರಥೋತ್ಸವ ಸೇವೆ. ರಥದ ದರ್ಶನ ಮತ್ತು ಸೇವೆ ಸಕಲ ಪಾಪ ನಿವಾರಕ.',
      'Grand sacred chariot festival procession ritual held during annual Jayanti utsav. Pulling or sponsoring the chariot brings eternal spiritual merit.',
      'हनुमान जयंती पर भव्य रथ खींचने एवं रथोत्सव की सेवा, जिसके दर्शन मात्र से समस्त पाप नष्ट हो जाते हैं।',
    ],
  },

  // 11: Anchor stadium (Center)
  {
    id: 11,
    number: '11',
    price: '₹500',
    left: 3660,
    top: 135,
    width: 420,
    height: 240,
    radius: 120,
    bgClass: 'bg-[#FFF9EE] border-2 border-[#C79A45] text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#C79A45] text-[#30251F]',
    textOffset: '8%',
    dotColor: '#C79A45',
    title: ['ನವಗ್ರಹ-ಗಣಪತಿ ಹೋಮ', 'Navagraha-Ganapathy Homa', 'नवग्रह-गणपति होम'],
    curvedText: [
      '● ನವಗ್ರಹ-ಗಣಪತಿ ಹೋಮ • ವೇದ ಮಂತ್ರ ಘೋಷ',
      '● Navagraha-Ganapathy Homa • Fire Ritual',
      '● नवग्रह-गणपति होम • गृह शांति',
    ],
    description: [
      'ಗಣಪತಿ ಹಾಗೂ ನವಗ್ರಹ ದೇವತೆಗಳನ್ನು ಪ್ರಸನ್ನಗೊಳಿಸಲು ವೈದಿಕ ಅಗ್ನಿಯಲ್ಲಿ ಹವಿ ಅರ್ಪಿಸುವ ಮಹಾ ಹೋಮ. ಗ್ರಹದೋಷ ನಿವಾರಣೆ ಮತ್ತು ಗೃಹ ಶಾಂತಿ ಲಭಿಸುತ್ತದೆ.',
      'Powerful fire ritual invoking Lord Ganesha and the nine planetary deities to eliminate obstacles and bestow harmony, health, and peace of mind.',
      'विघ्नहर्ता गणेश और नवग्रहों की पावन अग्नि में आहुति जिससे गृह-क्लेश और वास्तु दोष शांत होते हैं।',
    ],
  },

  // 12: Circle (Low)
  {
    id: 12,
    number: '12',
    price: '₹300',
    left: 4160,
    top: 290,
    width: 210,
    height: 210,
    radius: 105,
    bgClass: 'bg-[#FDF6EA] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '52%',
    dotColor: '#2A7B4C',
    title: ['ಕಡುಬು ಹಾರ ಸೇವೆ', 'Kadubu Hara Seva', 'कडुबु हार सेवा'],
    curvedText: [
      '● ಮಹಾ ಗಣಪತಿ ಕಡುಬು ಹಾರ • ಸಕಲ ವಿಘ್ನ ವಿನಾಶಕ',
      '● Kadubu Hara Seva • Modak Garland',
      '● कडुबु हार सेवा • मोदक अर्पण',
    ],
    description: [
      'ಆಶ್ರಮ ಸಂಕೀರ್ಣದಲ್ಲಿರುವ ಮಹಾ ಗಣಪತಿ ಸನ್ನಿಧಿಯಲ್ಲಿ ನಡೆಯುವ ಪವಿತ್ರ ಪಂಚಾಮೃತ ಅಭಿಷೇಕ ಮತ್ತು ಮೋದಕಗಳಿಂದ (ಕಡುಬು) ಸಿದ್ಧಪಡಿಸಿದ ಹಾರ ಸಮರ್ಪಣೆ. ಹೊಸ ಕಾರ್ಯಗಳಿಗೆ ಶುಭಫಲ.',
      'Dedicated seva at the complex’s Maha Ganapathy shrine including Panchamruta Abhisheka and offering a consecrated garland of 21 modaks (Kadubu Hara) to eliminate impediments before starting any enterprise.',
      'आश्रम परिसर में स्थित महागणपति मंदिर में पंचामृत अभिषेक एवं 21 मोदकों (कडुबु) की पावन माला अर्पण। नए व्यापार अथवा विद्यारंभ में शुभ फल देती है।',
    ],
  },

  // 13: Circle (High)
  {
    id: 13,
    number: '13',
    price: '₹500',
    left: 4440,
    top: 60,
    width: 230,
    height: 230,
    radius: 115,
    bgClass: 'bg-[#FFF9EE] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#C79A45] text-[#30251F]',
    textOffset: '12%',
    dotColor: '#C79A45',
    title: ['ಮಾಸಿಕ ಹೋಮಗಳು', 'Monthly Homas', 'मासिक हवन सेवा'],
    curvedText: [
      '● ಮಾಸಿಕ ಹೋಮಗಳು • ದತ್ತಾತ್ರೇಯ & ನಾರಾಯಣ',
      '● Monthly Homas • Dattatreya & Narayana',
      '● मासिक हवन • दत्तात्रेय एवं नारायण',
    ],
    description: [
      'ಅವಧೂತ ದತ್ತ ಪೀಠದ ಸನ್ನಿಧಿಯಲ್ಲಿ ದತ್ತಾತ್ರೇಯ, ಶಿವ, ಲಕ್ಷ್ಮೀ ಮತ್ತು ನಾರಾಯಣ ದೇವರಿಗೆ ನಡೆಯುವ ಮಾಸಿಕ ಹೋಮ ಹಾಗೂ ನಿತ್ಯ ಅಭಿಷೇಕ ಸೇವೆಗಳು.',
      'Daily Abhishekas and specialized monthly fire rituals performed individually for Lord Dattatreya, Shiva, Lakshmi, and Narayana.',
      'दत्तात्रेय एवं शिव मंदिर में दैनिक अभिषेक एवं मासिक विशेष हवन जिससे आध्यात्मिक प्रगति होती है।',
    ],
  },

  // 14: Circle (Mid-low)
  {
    id: 14,
    number: '14',
    price: '₹100',
    left: 4740,
    top: 280,
    width: 220,
    height: 220,
    radius: 110,
    bgClass: 'bg-[#FAF0E1] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#742C25] text-[#FFF9EE]',
    textOffset: '52%',
    dotColor: '#1D6386',
    title: ['ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ', 'Satyanarayana Puja', 'सत्यनारायण पूजा'],
    curvedText: [
      '● ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ • ಹುಣ್ಣಿಮೆಯ ಶುಭ ವ್ರತ',
      '● Satyanarayana Puja • Full Moon Seva',
      '● सत्यनारायण पूजा • पूर्णिमा व्रत',
    ],
    description: [
      'ಹುಣ್ಣಿಮೆ (ಪೌರ್ಣಮಿ) ಹಾಗೂ ಶುಭ ದಿನಗಳಲ್ಲಿ ನಡೆಯುವ ಪವಿತ್ರ ಶ್ರೀ ಸತ್ಯನಾರಾಯಣ ಸ್ವಾಮಿ ವ್ರತ ಮತ್ತು ಕಥಾ ಶ್ರವಣ ಸೇವೆ. ಕೌಟುಂಬಿಕ ಸಮೃದ್ಧಿ ಲಭಿಸುತ್ತದೆ.',
      'Sacred Sri Satyanarayana Swami Puja and Katha recitation performed on auspicious days like Full Moon (Pournami) for domestic happiness.',
      'पूर्णिमा के पावन दिन आयोजित होने वाली सत्यनारायण स्वामी पूजा एवं पावन कथा श्रवण।',
    ],
  },

  // 15: Rounded horizontal capsule (High-right)
  {
    id: 15,
    number: '15',
    price: '₹10,000',
    left: 5040,
    top: 60,
    width: 320,
    height: 200,
    radius: 100,
    bgClass: 'bg-[#FFF9EE] border-2 border-[#C79A45]/70 text-[#742C25]',
    numberClass: 'text-[#742C25]/30',
    priceClass: 'bg-[#C79A45] text-[#30251F]',
    textOffset: '8%',
    dotColor: '#C79A45',
    title: ['ಪ್ರಧಾನ ಅನ್ನದಾನ ಸೇವೆ', 'Pradhana Annadana', 'प्रधान अन्नदान सेवा'],
    curvedText: [
      '● ಪ್ರಧಾನ ಅನ್ನದಾನ ಸೇವೆ • ಅನ್ನದಾತ ಸುಖೀಭವ',
      '● Pradhana Annadana Seva • Feeding Devotees',
      '● प्रधान अन्नदान सेवा • अक्षय पुण्य',
    ],
    description: [
      'ಅವಧೂತ ದತ್ತ ಪೀಠದ ಪವಿತ್ರ ಅನ್ನಛತ್ರದಲ್ಲಿ ದರ್ಶನಕ್ಕೆ ಆಗಮಿಸುವ ಸಹಸ್ರಾರು ಭಕ್ತರಿಗೆ ಪ್ರಸಾದ ಭೋಜನವನ್ನು ಪ್ರಾಯೋಜಿಸುವ ಮಹತ್ತರ ಪುಣ್ಯ ಸೇವೆ. ಅನ್ನದಾನಂ ಪರಂ ದಾನಂ ಎಂಬಂತೆ ಸಕಲ ಪಾಪಗಳು ಕಳೆದು ವಂಶಾಭಿವೃದ್ಧಿ ಉಂಟಾಗುತ್ತದೆ.',
      'Grand-scale community kitchen sponsorship serving thousands of visiting devotees with sanctified prasadam meals daily at Avadhoota Datta Peetham. Ancient scriptures declare Annadanam as the highest of all charities.',
      'अवधूत दत्त पीठम के पावन अन्नक्षेत्र में दर्शनार्थियों हेतु निःशुल्क महाप्रसाद भोजन की व्यवस्था। शास्त्रों में अन्नदान को सर्वश्रेष्ठ दान माना गया है।',
    ],
  },
];

// Helper to generate precise SVG path for stadium/capsule shape with outward offset
function createStadiumPath(width, height, radius, offset = 0) {
  const w = width + offset * 2;
  const h = height + offset * 2;
  const r = Math.min(radius + offset, w / 2, h / 2);
  const x = -offset;
  const y = -offset;

  return `M ${x + r} ${y}
    H ${x + w - r}
    A ${r} ${r} 0 0 1 ${x + w} ${y + r}
    V ${y + h - r}
    A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}
    H ${x + r}
    A ${r} ${r} 0 0 1 ${x} ${y + h - r}
    V ${y + r}
    A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}

// -----------------------------------------------------------------------------
// PURE CODE DESIGN FOR SACRED KASUTI JALI & BORDERS (UNIFIED 72px GEOMETRY)
// Perfectly aligned across the entire scroll track with zero seams and zero breaks.
// Background: Deep Dark Brick Red (#742C25)
// Design: Sacred Light Gold (#E5C07B)
// Top Border, Middle Jali, and Bottom Border share the exact same 72px theme pitch.
// -----------------------------------------------------------------------------
const CENTER_JALI_D = [
  // Outer and inner continuous diamond lattice lines (W=72, H=72)
  'M 36 0 L 72 36 L 36 72 L 0 36 Z',
  'M 36 5 L 67 36 L 36 67 L 5 36 Z',
  // Symmetrical Central 8-Pointed Lotus / Padma Rosette at (36, 36)
  'M 36 22 L 36 50 M 22 36 L 50 36',
  'M 26 26 L 46 46 M 26 46 L 46 26',
  'M 36 30 L 42 36 L 36 42 L 30 36 Z',
  'M 36 18 L 38 21 L 36 24 L 34 21 Z',
  'M 36 48 L 38 51 L 36 54 L 34 51 Z',
  'M 18 36 L 21 38 L 24 36 L 21 34 Z',
  'M 48 36 L 51 38 L 54 36 L 51 34 Z',
  // Corner Rosette quarters assembling at tile boundaries (0,0), (72,0), (0,72), (72,72)
  'M 0 14 L 0 0 L 14 0 M 0 0 L 10 10 M 0 6 L 6 0',
  'M 72 14 L 72 0 L 58 0 M 72 0 L 62 10 M 72 6 L 66 0',
  'M 0 58 L 0 72 L 14 72 M 0 72 L 10 62 M 0 66 L 6 72',
  'M 72 58 L 72 72 L 58 72 M 72 72 L 62 62 M 72 66 L 66 72',
  // Auspicious stitch accents at diamond junctions
  'M 33 0 L 39 0 M 36 -3 L 36 3',
  'M 69 36 L 75 36 M 72 33 L 72 39',
  'M 33 72 L 39 72 M 36 69 L 36 75',
  'M -3 36 L 3 36 M 0 33 L 0 39'
].join(' ');

const TOP_BORDER_D = [
  // Top parallel gold rules
  'M 0 6 L 72 6 M 0 10 L 72 10 M 0 14 L 72 14',
  // Continuous diamond chain fretwork row (y=16 to y=32)
  'M 9 16 L 18 24 L 9 32 L 0 24 Z',
  'M 27 16 L 36 24 L 27 32 L 18 24 Z',
  'M 45 16 L 54 24 L 45 32 L 36 24 Z',
  'M 63 16 L 72 24 L 63 32 L 54 24 Z',
  // Inner cross stars inside diamond chain
  'M 7 24 L 11 24 M 9 22 L 9 26',
  'M 25 24 L 29 24 M 27 22 L 27 26',
  'M 43 24 L 47 24 M 45 22 L 45 26',
  'M 61 24 L 65 24 M 63 22 L 63 26',
  // Horizontal dividing bar
  'M 0 34 L 72 34',
  // Stepped temple Gopura chevron pointing downward with apex at (36, 68)
  'M 0 38 L 6 43 L 12 48 L 18 53 L 24 58 L 30 63 L 36 68 L 42 63 L 48 58 L 54 53 L 60 48 L 66 43 L 72 38',
  'M 0 34 L 6 39 L 12 44 L 18 49 L 24 54 L 30 59 L 36 64 L 42 59 L 48 54 L 54 49 L 60 44 L 66 39 L 72 34',
  // Kalasha pendant at apex
  'M 36 68 L 36 71 M 34 71 L 38 71',
  // Auspicious flower motif inside chevron hollow
  'M 36 44 L 36 52 M 32 48 L 40 48 M 34 46 L 38 50 M 34 50 L 38 46'
].join(' ');

const BOTTOM_BORDER_D = [
  // Stepped temple Gopura chevron pointing upward with apex at (36, 4)
  'M 0 34 L 6 29 L 12 24 L 18 19 L 24 14 L 30 9 L 36 4 L 42 9 L 48 14 L 54 19 L 60 24 L 66 29 L 72 34',
  'M 0 38 L 6 33 L 12 28 L 18 23 L 24 18 L 30 13 L 36 8 L 42 13 L 48 18 L 54 23 L 60 28 L 66 33 L 72 38',
  // Kalasha finial at apex
  'M 36 1 L 36 4 M 34 1 L 38 1',
  // Auspicious flower motif inside chevron hollow
  'M 36 20 L 36 28 M 32 24 L 40 24 M 34 22 L 38 26 M 34 26 L 38 22',
  // Horizontal dividing bar
  'M 0 38 L 72 38',
  // Continuous diamond chain fretwork row (y=40 to y=56)
  'M 9 40 L 18 48 L 9 56 L 0 48 Z',
  'M 27 40 L 36 48 L 27 56 L 18 48 Z',
  'M 45 40 L 54 48 L 45 56 L 36 48 Z',
  'M 63 40 L 72 48 L 63 56 L 54 48 Z',
  // Inner cross stars inside diamond chain
  'M 7 48 L 11 48 M 9 46 L 9 50',
  'M 25 48 L 29 48 M 27 46 L 27 50',
  'M 43 48 L 47 48 M 45 46 L 45 50',
  'M 61 48 L 65 48 M 63 46 L 63 50',
  // Bottom parallel gold rules
  'M 0 58 L 72 58 M 0 62 L 72 62 M 0 66 L 72 66'
].join(' ');

export default function Poojas({ langIndex = 0 }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsTrackRef = useRef(null);
  const bgTrackRef = useRef(null);

  // Custom Cursor state (View bubble from reference image)
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  // Simple popup modal on click
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [showIndexDrawer, setShowIndexDrawer] = useState(false);

  // Localized UI strings
  const UI = {
    sectionTitle: ['ಪೂಜೆಗಳು & ಸೇವೆಗಳು', 'POOJAS & SEVAS', 'पूजा एवं सेवाएँ'][langIndex] || 'POOJAS & SEVAS',
    scrollPrompt: ['ಎಡಕ್ಕೆ ಸರಿಸಿ ನೋಡಿ', 'SCROLL TO EXPLORE', 'आगे देखने के लिए स्क्रॉल करें'][langIndex] || 'SCROLL TO EXPLORE',
    indexButton: 'INDEX',
    allSevas: ['ದೇವಸ್ಥಾನದ ಸಮಸ್ತ ಸೇವೆಗಳು', 'All Temple Sevas', 'मंदिर की समस्त सेवाएँ'][langIndex] || 'All Temple Sevas',
    close: ['ಮುಚ್ಚಿರಿ', 'Close', 'बंद करें'][langIndex] || 'Close',
    priceLabel: ['ಸೇವಾ ಶುಲ್ಕ:', 'Seva Price:', 'सेवा शुल्क:'][langIndex] || 'Price:',
  };

  const handleMouseMove = useCallback((e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  // ---------------------------------------------------------------------------
  // GSAP SCROLL-TRIGGER PINNED HORIZONTAL SCROLL
  // Cards move smoothly along with the background, with a subtle parallax differential
  // (cards move at 100% speed, background ribbon lines move at ~84% speed)
  // so the cards feel like they are floating over the background instead of being glued!
  // Section stays pinned until all cards pass across the viewport!
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!sectionRef.current || !cardsTrackRef.current || !bgTrackRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cardsTrack = cardsTrackRef.current;
      const bgTrack = bgTrackRef.current;

      const calcScroll = () => {
        const totalCardsWidth = cardsTrack.scrollWidth;
        const windowWidth = window.innerWidth;
        return Math.max(0, totalCardsWidth - windowWidth + (windowWidth < 640 ? 40 : 180));
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Foreground Cards Track: moves horizontally across total scroll width
      tl.to(
        cardsTrack,
        {
          x: () => -calcScroll(),
          ease: 'none',
        },
        0
      );

      // 2. Background Ribbon Lines: moves along in same direction, slightly slower (84%)
      // Creates the requested "feels like the cards move a little bit not glued along with background"
      tl.to(
        bgTrack,
        {
          x: () => -(calcScroll() * 0.84),
          ease: 'none',
        },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="poojas"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[540vh] bg-[#742C25] select-none text-[#FFF9EE]"
    >
      {/* =================================================================== */}
      {/* CUSTOM "view" CURSOR BUBBLE (Exact match to reference image 1)      */}
      {/* Appears when hovering over any pooja card (Desktop only)            */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="hidden md:block fixed pointer-events-none z-50 transition-opacity duration-200"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: isHoveringCard ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHoveringCard ? 1 : 0.3})`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease-out',
        }}
      >
        <div className="w-20 sm:w-22 h-20 sm:h-22 rounded-full bg-[#FCECD0]/95 backdrop-blur-xs text-[#30251F] border border-[#E5D2B3] shadow-[0_12px_35px_rgba(0,0,0,0.4)] flex items-center justify-center font-serif text-sm tracking-widest font-normal lowercase select-none">
          view
        </div>
      </div>

      {/* =================================================================== */}
      {/* PINNED VIEWPORT STAGE (Fixed while scrolling through h-[540vh])      */}
      {/* =================================================================== */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* ================================================================= */}
        {/* LAYER 0: PURE CODE DESIGN SACRED GOLD-ON-BRICK BACKGROUND         */}
        {/* Continuous & seamless with ZERO tile breaks or seams              */}
        {/* Deep Dark Brick Red (#742C25) with Soft Faded Light Gold (#F3E5C8)*/}
        {/* Unified 72px pitch: Top Gopuram, Middle Jali, Bottom Gopuram       */}
        {/* ================================================================= */}
        <div
          ref={bgTrackRef}
          aria-hidden="true"
          className="absolute inset-0 w-[5800px] min-w-[5800px] h-full pointer-events-none z-0 origin-left will-change-transform overflow-hidden"
        >
          <svg
            className="w-full h-full block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 1. Seamless Top Gopuram Border Pattern (W=72, H=72) */}
              <pattern
                id="topBorderPattern"
                width="72"
                height="72"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={TOP_BORDER_D}
                  stroke="#F3E5C8"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </pattern>

              {/* 2. Seamless Central Diamond Lotus Jali Pattern (W=72, H=72) */}
              <pattern
                id="sacredJaliPattern"
                width="72"
                height="72"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={CENTER_JALI_D}
                  stroke="#F3E5C8"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </pattern>

              {/* 3. Seamless Bottom Gopuram Border Pattern (W=72, H=72) */}
              <pattern
                id="bottomBorderPattern"
                width="72"
                height="72"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={BOTTOM_BORDER_D}
                  stroke="#F3E5C8"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </pattern>
            </defs>

            {/* BASE FABRIC: Solid Dark Brick Red (#742C25) */}
            <rect width="100%" height="100%" fill="#742C25" />

            {/* FULL SCREEN SEAMLESS DIAMOND LOTUS JALI FIELD (Soft subtle faded texture) */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#sacredJaliPattern)"
              opacity="0.25"
            />

            {/* TOP BORDER BAND: Identical 72px pitch with clean opaque backing */}
            <g>
              <rect x="0" y="0" width="100%" height="72" fill="#742C25" />
              <rect x="0" y="0" width="100%" height="72" fill="url(#topBorderPattern)" opacity="0.35" />
              <rect x="0" y="71" width="100%" height="1" fill="#F3E5C8" opacity="0.25" />
            </g>

            {/* BOTTOM BORDER BAND: Identical 72px pitch with clean opaque backing */}
            <g>
              <rect x="0" y="calc(100% - 72px)" width="100%" height="72" fill="#742C25" />
              <rect
                x="0"
                y="calc(100% - 72px)"
                width="100%"
                height="72"
                fill="url(#bottomBorderPattern)"
                opacity="0.35"
              />
              <rect x="0" y="calc(100% - 72px)" width="100%" height="1" fill="#F3E5C8" opacity="0.25" />
            </g>
          </svg>
        </div>

        {/* ================================================================= */}
        {/* MAIN HORIZONTAL TRACK: Spaced Cards with Titles on TOP ONLY       */}
        {/* Smaller card sizes, generous gaps, plain color surfaces           */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full flex-1 flex items-center overflow-visible">
          <div
            ref={cardsTrackRef}
            className="relative h-[560px] sm:h-[620px] will-change-transform origin-left scale-[0.80] xs:scale-[0.86] sm:scale-100"
            style={{ width: '5800px' }}
          >
            {POOJAS_DATA.map((card) => {
              const cardW = card.width;
              const cardH = card.height;
              const cardR = card.radius;
              const pathId = `pill-path-${card.id}`;
              const stadiumPath = createStadiumPath(cardW, cardH, cardR, 12);

              return (
                <div
                  key={card.id}
                  className="absolute transition-transform duration-300 hover:scale-[1.025]"
                  style={{
                    left: `${card.left}px`,
                    top: `${card.top}px`,
                    width: `${cardW}px`,
                    height: `${cardH}px`,
                  }}
                  onMouseEnter={() => setIsHoveringCard(true)}
                  onMouseLeave={() => setIsHoveringCard(false)}
                >
                  {/* Outer SVG for Curved Text along perimeter (Radiant Gold against Dark Brick Red) */}
                  <svg
                    aria-hidden="true"
                    className="absolute -top-3 -left-3 pointer-events-none overflow-visible z-20"
                    style={{
                      width: `${cardW + 24}px`,
                      height: `${cardH + 24}px`,
                    }}
                    viewBox={`-12 -12 ${cardW + 24} ${cardH + 24}`}
                  >
                    <defs>
                      <path id={pathId} d={stadiumPath} fill="none" />
                    </defs>
                    <text
                      className="font-serif text-[11px] sm:text-[12px] font-semibold fill-[#F5DEB3] tracking-widest select-none drop-shadow-md"
                    >
                      <textPath
                        href={`#${pathId}`}
                        startOffset={card.textOffset}
                      >
                        <tspan fill={card.dotColor || '#E5C07B'} fontSize="14px">
                          ●{' '}
                        </tspan>
                        {card.curvedText[langIndex]}
                      </textPath>
                    </text>
                  </svg>

                  {/* Main Pill / Circle Card Body: Plain Color, Title on TOP ONLY */}
                  <div
                    onClick={() => setSelectedPooja(card)}
                    className={`relative w-full h-full overflow-hidden cursor-pointer shadow-[0_14px_36px_rgba(0,0,0,0.35)] transition-all duration-300 p-5 sm:p-6 flex flex-col justify-start gap-2 ${card.bgClass}`}
                    style={{
                      borderRadius: `${cardR}px`,
                    }}
                  >
                    {/* TOP HEADER: Large Number & Price Badge */}
                    <div className="flex items-center justify-between w-full pointer-events-none mb-1">
                      <span className={`text-3xl sm:text-4xl md:text-5xl font-serif font-light leading-none select-none ${card.numberClass}`}>
                        {card.number}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-serif font-bold tracking-wide shadow-xs ${card.priceClass}`}>
                        {card.price}
                      </span>
                    </div>

                    {/* TOP TITLE: Placed on TOP SIDE ONLY, Bigger font size */}
                    <div className="pointer-events-none pr-1">
                      <h3 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold leading-tight drop-shadow-xs">
                        {card.title[langIndex]}
                      </h3>
                    </div>

                    {/* Empty interior: plain clean color fill for future images */}
                    <div className="flex-1 w-full" />
                  </div>
                </div>
              );
            })}

            {/* Concluding Card: Complete Temple Darshan */}
            <div
              className="absolute w-[360px] h-[220px] rounded-[110px] bg-[#FFF9EE] border-2 border-[#E5C07B] shadow-[0_14px_36px_rgba(0,0,0,0.35)] p-6 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform text-[#30251F]"
              style={{ left: '5460px', top: '160px' }}
              onClick={() => setShowIndexDrawer(true)}
              onMouseEnter={() => setIsHoveringCard(true)}
              onMouseLeave={() => setIsHoveringCard(false)}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif text-[#C79A45]">✦</span>
                <span className="px-3 py-1 rounded-full bg-[#742C25] text-[#FFF9EE] text-xs font-serif font-bold">
                  {UI.allSevas}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#742C25] leading-snug">
                  {langIndex === 0 ? 'ಶ್ರೀ ಕಾರ್ಯ ಸಿದ್ಧಿ ದರ್ಶನ' : 'Sri Karya Siddhi Darshana'}
                </h3>
                <p className="font-serif text-xs text-[#76665A] mt-1 leading-relaxed">
                  {langIndex === 0
                    ? '15 ವಿಶೇಷ ಸೇವೆಗಳು & ಪೂಜೆಗಳು ಲಭ್ಯವಿವೆ.'
                    : '15 Sacred Sevas & Poojas available.'}
                </p>
              </div>

              <div className="pt-2 border-t border-[#D9C7AA]/50 flex items-center justify-between text-xs font-serif font-bold text-[#742C25]">
                <span>INDEX →</span>
                <span className="text-xs font-normal text-[#76665A]">Click to view all</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SIMPLE POPUP CARD (Opens smoothly from bottom to top on click)      */}
      {/* Just Description, Price, and Close as requested!                    */}
      {/* Not full screen, slightly wider (max-w-2xl ~680px)                  */}
      {/* =================================================================== */}
      {selectedPooja && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setSelectedPooja(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#FFF9EE] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-[#E5C07B]/60 select-none text-[#30251F] max-h-[85vh] sm:max-h-[75vh] overflow-y-auto transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom-20 fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button X */}
            <button
              type="button"
              onClick={() => setSelectedPooja(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EFE3C7] hover:bg-[#742C25] hover:text-[#FFF9EE] text-[#742C25] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Number */}
            <div className="flex items-center gap-3 mb-1">
              <span className="font-serif text-3xl sm:text-4xl font-light text-[#742C25]">
                {selectedPooja.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#742C25] leading-snug">
              {selectedPooja.title[langIndex]}
            </h3>

            {/* Price Highlight */}
            <div className="my-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#742C25] text-[#FFF9EE] font-serif text-sm font-bold shadow-xs">
              <span>{UI.priceLabel}</span>
              <span className="text-[#F7D788] text-base">{selectedPooja.price}</span>
            </div>

            {/* Description (Verbatim from user's notes) */}
            <p className="font-serif text-sm sm:text-base leading-relaxed text-[#3A2E28] mb-6">
              {selectedPooja.description[langIndex]}
            </p>

            {/* Simple Close Button */}
            <div className="flex justify-end pt-3 border-t border-[#D9C7AA]/60">
              <button
                type="button"
                onClick={() => setSelectedPooja(null)}
                className="px-6 py-2.5 rounded-full bg-[#742C25] hover:bg-[#5C231D] text-[#FFF9EE] font-serif text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-md"
              >
                {UI.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ALL SEVAS INDEX DRAWER                                              */}
      {/* =================================================================== */}
      {showIndexDrawer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setShowIndexDrawer(false)}
        >
          <div
            className="w-full max-w-md h-full bg-[#FFF9EE] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-l-2 border-[#E5C07B]/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D9C7AA]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#742C25]" />
                  <h3 className="font-serif text-lg font-bold text-[#742C25]">
                    {UI.allSevas}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIndexDrawer(false)}
                  className="w-8 h-8 rounded-full bg-[#EFE3C7] hover:bg-[#742C25] hover:text-[#FFF9EE] text-[#742C25] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-[#D9C7AA]/60 mt-4 max-h-[70vh] overflow-y-auto pr-1">
                {POOJAS_DATA.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShowIndexDrawer(false);
                      setSelectedPooja(item);
                    }}
                    className="py-3 flex items-center justify-between hover:bg-[#F5ECE0] px-3 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg text-[#C79A45] font-light">
                        {item.number}
                      </span>
                      <div>
                        <div className="font-serif text-sm font-bold text-[#30251F] group-hover:text-[#742C25] transition-colors">
                          {item.title[langIndex]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xs font-semibold text-[#742C25]">
                        {item.price}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C79A45] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-[#D9C7AA]">
              <p className="font-serif text-xs text-[#76665A] text-center mb-3">
                ಶ್ರೀ ಗಣಪತಿ ಸಚ್ಚಿದಾನಂದ ಆಶ್ರಮ • ಗಿರಿನಗರ, ಬೆಂಗಳೂರು
              </p>
              <button
                type="button"
                onClick={() => setShowIndexDrawer(false)}
                className="w-full py-2.5 rounded-full bg-[#742C25] hover:bg-[#5C231D] text-[#FFF9EE] font-serif text-xs font-bold transition-colors cursor-pointer text-center"
              >
                {UI.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
