// JavaScript Document
ans0 = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
ball = new Array(1, 1, 1, 1, 1, 5, 1, 1, 1, 1);
menz = new Array(5, 10, 2, 4);
volum = new Array(0, 0, 3, 5, 6, 8, 10, 11, 13, 15, 16, 18, 20, 21, 23, 25);
density = new Array(
  0,
  0,
  6.0,
  6.8,
  7.3,
  8.3,
  9.4,
  10.0,
  11.4,
  12.8,
  13.6,
  15.4,
  17.3,
  18.3,
  20.6,
  23.0
);
pressure = new Array(
  0,
  0,
  760,
  880,
  930,
  1060,
  1230,
  1330,
  1490,
  1710,
  1810,
  2070,
  2330,
  2490,
  2810,
  3170
);
var damples = [
  [100, 81, 63, 45, 28, 11, 0, 0, 0, 0, 0],
  [100, 81, 63, 45, 28, 11, 0, 0, 0, 0, 0],
  [100, 84, 69, 54, 39, 24, 12, 0, 0, 0, 0],
  [100, 85, 73, 58, 45, 31, 18, 5, 0, 0, 0],
  [100, 86, 73, 60, 47, 35, 23, 10, 0, 0, 0],
  [100, 87, 75, 63, 51, 40, 28, 18, 7, 0, 0],
  [100, 88, 76, 65, 54, 44, 34, 24, 14, 5, 0],
  [100, 89, 77, 67, 56, 46, 36, 27, 18, 8, 5],
  [100, 89, 79, 69, 58, 50, 40, 32, 22, 14, 7],
  [100, 90, 80, 70, 61, 53, 44, 36, 27, 19, 12],
  [100, 90, 81, 71, 62, 54, 45, 37, 30, 22, 15],
  [100, 91, 82, 73, 65, 56, 49, 41, 34, 27, 20],
  [100, 91, 83, 74, 66, 59, 51, 44, 37, 30, 24],
  [100, 92, 83, 75, 67, 61, 52, 46, 39, 35, 26],
  [100, 92, 83, 77, 69, 62, 55, 48, 41, 36, 33],
  [100, 92, 84, 78, 70, 63, 57, 50, 44, 41, 38],
];

ans = new Array();
testName = "2018";
showCorrWrong = true;
maxAttempts = 0;
startDoc = testName;
testDoc = testName + "1";
maxScore = 0;
nmax = ans0.length;

imgYes = new Image();
imgNo = new Image();
imgYes.src = "yes.gif";
imgNo.src = "no.gif";

regname = "";
score = 0;
score0 = 0;
attempt = 0;
n = 0;
phi = 0;
pn = 0;
m = 0;

function init() {
  //   document.forms.test.reset(); //-- подочистка
  //   document.res.mark.value = '';

  numberMenz = 0; //--случайный номер шкалы - использование Math.round() даст неравномерное распределение!

  for (j = 1; j < 6; j++) {
    jj = "de" + j;
    document.getElementById(jj).innerText =
      menz[numberMenz] + (j - 1) * Math.abs(menz[numberMenz]); //-- печать цифры в ячейку по номеру шкалы
    jj = "de" + (j + 5);
    document.getElementById(jj).innerText =
      menz[numberMenz] + (j - 1) * Math.abs(menz[numberMenz]);
  }

  numberVolum = Math.floor(Math.random() * 14) + 2; // случайный номер температуры сухого

  for (k = 1; k < numberVolum; k++) {
    level = "u" + k; // выбор ячейки таблицы температуры сухого
    document.getElementById(level).style.background = "#000000";
  } //-- печать высоты столбика по номеру температуры

  y = numberVolum;
  if (numberVolum > 6) {
    y = 5;
  }
  dt = numberVolum - Math.floor(Math.random() * y); //-- случайный столбик влажного
  if (dt < 2) {
    dt = 2;
  }
  t = volum[dt]; //-- температура влажного
  vol = volum[numberVolum]; //-- температура сухого
  deltat = vol - t; //-- разность температур
  if (deltat >= 10) {
    deltat = deltat - 10;
    dt = dt - 6;
    t = volum[dt]; //-- температура влажного;}
  }
  phi = damples[numberVolum][deltat]; //-- влажность воздуха
  m = (density[k] * phi) / 100; //-- плотность паров
  pn = pressure[k]; //-- давление насыщенных паров

  for (n = 1; n < dt; n++) {
    level = "u" + (n + 20); // выбор ячейки таблицы температуры влажного
    document.getElementById(level).style.background = "#000000";
  } //-- печать высоты столбика по номеру температуры

  ans0[0] = 1; //-- ответ цена деления
  ans0[1] = 27; //-- ответ 2 предел изм
  ans0[2] = vol; //-- ответ 3 сухого
  ans0[3] = t; //-- ответ 4 влажного
  ans0[4] = deltat; //-- ответ 5 разность
  ans0[5] = phi; //-- ответ 6 влажность
  ans0[6] = pn; //-- ответ 7 давление насыщенного
  ans0[7] = (phi * pn) / 100; //-- ответ 8 давление реальное
  ans0[8] = m; //-- ответ 9 плотность пара
  ans0[9] = m * 80; //-- масса пара

  // ______________________ для оценки результатов:

  resultEstimation = new Array(
    "Замечательный результат!",
    "Это хороший результат.",
    "Вполне прилично.",
    "Неплохо, но можно лучше.",
    "Результат не очень хороший.",
    "Наверное, Вы были невнимательны. Слишком много ошибок."
  );
  resultPercent = new Array(1, 0.85, 0.75, 0.65, 0.55, 0);
}
//_____________________________________________________________________
function test1() {
  for (i = 0; i < nmax; i++) {
    ans[i] = document.getElementById(i + 1).value; //---считывание ученика ответа из формы
    if (ans0[i] >= 0) {
      sign = 1;
    } else {
      sign = -1;
    } //---определение знака величины
    if (ans[i] < ans0[i] * 0.9 || ans[i] > ans0[i] * 1.1) {
      //---сравнение его с правильным ответом
      imgSrc = "no";
    } //---если неправильно - синий крест
    else {
      score = score + ball[i];
      imgSrc = "yes";
    } //---если правильно, увеличить баллы из базы баллов, красная галка
    eval("document.a" + (i + 1) + '.src="' + imgSrc + '.gif"'); //---печать индикатора правильности ответа
    n = n + 1; //---подсчет ответов
    maxScore = maxScore + ball[i]; //---подсчет максимума баллов для оценивания
  }

  //---------------------------------------   окончания для слов балл и результата

  if (n == 1) {
    oo = "";
  } else oo = "а";
  if (n == 0 || n == 5) {
    oo = "ов";
  } else {
  }

  if (score == 1) {
    ob = "";
  } else ob = "ов";
  if (score == 2 || score == 3 || score == 4) {
    ob = "а";
  } else {
  }
  //---------------------------------------вывод результата в окно

  var s = "";
  rate = "";

  s = s + "Попытки ответов на вопросы исчерпаны.\n\n";
  s =
    s +
    "По результатам ответов вы получили " +
    score +
    " балл" +
    ob +
    " из " +
    maxScore +
    " возможных" +
    ". \n";

  if (attempt == 0) {
    if (score == maxScore) {
      rate = resultEstimation[0];
    } else {
      for (i = 1; i < resultEstimation.length; i++) {
        if (
          score < maxScore * resultPercent[i - 1] &&
          score >= maxScore * resultPercent[i]
        ) {
          rate = resultEstimation[i];
          break;
        }
      }
    }
  }

  rating = parseInt((score * 500) / maxScore) / 100;

  s = s + rate + "\n\n" + "ОЦЕНКА: " + rating;

  if (attempt == 0) {
    document.res.mark.value = s;
    attempt = attempt + 1;
  } else {
    s = "Попытки ответов на вопросы исчерпаны.\n\n";
  }
  //_____________________________________________________________________
}

function interpolate(value) {
    const points = [
      { x: 6, y: 8 },
      { x: 8, y: 12 },
      { x: 10, y: 15 },
      { x: 12, y: 18 },
      { x: 17, y: 22 },
    ];
  
    // Знаходимо два найближчі опорні значення
    let i = 0;
    while (i < points.length - 1 && points[i + 1].x < value) {
      i++;
    }
  
    const p0 = points[i];
    const p1 = points[i + 1];
  
    // Обчислюємо інтерпольоване значення
    const t = (value - p0.x) / (p1.x - p0.x);
    const y = p0.y + t * (p1.y - p0.y);
  
    return y;
  }

function getRandomNumber(min, max) {
    // Випадкове число включно з min та max
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function init_new() {
  let numberVolum = getRandomNumber(6, 12);
  y = numberVolum;
  if (numberVolum > 4) {
    y = 4;
  }
  let dt = getRandomNumber(numberVolum - 5, numberVolum-1);
  console.log('сухий ', interpolate(numberVolum));
  console.log('вологий ', interpolate(dt));

  for (k = 1; k < numberVolum; k++) {
    let level = "u" + k; // выбор ячейки таблицы температуры сухого
    document.getElementById(level).style.background = "#000000";
    
    
  }

  for (n = 1; n < dt; n++) {
    let level = "u" + (n + 20); // выбор ячейки таблицы температуры влажного
    document.getElementById(level).style.background = "#000000";
  } //-- печать высоты столбика по номеру температуры
  
}

init_new();

// -->
