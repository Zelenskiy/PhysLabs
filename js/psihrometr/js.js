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

const densityDamp = [
  4.8, 5.2, 5.6, 6.0, 6.4, 6.9, 7.3, 7.8, 8.3, 8.9, 9.4, 10.1, 10.7, 11.4, 12.1,
  12.9, 13.6, 14.5, 15.4, 16.4, 17.3, 18.4, 19.4, 20.6, 21.8, 23.1, 24.4, 25.8,
  27.2, 28.8, 30.3,
];

var damples = [
  [100, 82, 63, 45, 28, 11, 0, 0, 0, 0, 0, 0],
  [100, 83, 65, 48, 32, 16, 0, 0, 0, 0, 0, 0],
  [100, 84, 68, 51, 35, 20, 0, 0, 0, 0, 0, 0],
  [100, 84, 69, 54, 39, 24, 10, 0, 0, 0, 0, 0],
  [100, 85, 70, 56, 42, 28, 14, 0, 0, 0, 0, 0],
  [100, 86, 72, 58, 45, 32, 19, 6, 0, 0, 0, 0],
  [100, 86, 73, 60, 47, 35, 23, 10, 0, 0, 0, 0],
  [100, 87, 74, 61, 49, 37, 26, 14, 0, 0, 0, 0],
  [100, 87, 75, 63, 51, 40, 28, 18, 7, 0, 0, 0],
  [100, 88, 76, 64, 53, 42, 31, 21, 11, 0, 0, 0],
  [100, 88, 76, 65, 54, 44, 34, 24, 14, 4, 0, 0],
  [100, 88, 77, 66, 56, 46, 36, 26, 17, 8, 0, 0],
  [100, 89, 78, 68, 57, 48, 38, 29, 20, 11, 0, 0],
  [100, 89, 79, 69, 59, 49, 40, 31, 23, 14, 6, 0],
  [100, 90, 79, 70, 60, 51, 42, 33, 25, 17, 9, 0],
  [100, 90, 80, 71, 61, 52, 44, 36, 27, 20, 12, 5],
  [100, 90, 81, 71, 62, 54, 45, 37, 30, 22, 15, 8],
  [100, 90, 81, 72, 64, 55, 47, 39, 32, 24, 17, 10],
  [100, 90, 81, 72, 64, 56, 48, 41, 34, 26, 20, 13],
  [100, 91, 82, 73, 64, 56, 48, 41, 34, 26, 20, 13],
  [100, 91, 82, 74, 65, 58, 50, 43, 35, 29, 22, 15],
  [100, 91, 83, 74, 66, 59, 51, 44, 37, 30, 24, 18],
  [100, 91, 83, 75, 67, 60, 52, 46, 39, 32, 26, 20],
  [100, 91, 83, 75, 67, 60, 52, 46, 39, 32, 26, 20],
  [100, 92, 83, 76, 68, 61, 54, 47, 40, 34, 28, 22],
  [100, 92, 84, 76, 69, 61, 55, 48, 42, 36, 30, 24],
  [100, 92, 84, 77, 69, 62, 56, 49, 43, 37, 31, 26],
  [100, 92, 84, 77, 70, 63, 57, 50, 44, 38, 33, 27],
  [100, 92, 85, 78, 71, 64, 58, 51, 45, 40, 34, 29],
  [100, 92, 85, 78, 71, 65, 59, 52, 47, 41, 36, 30],
  [100, 93, 85, 78, 72, 65, 59, 53, 48, 42, 37, 32],
  [100, 93, 86, 79, 72, 66, 60, 54, 49, 43, 38, 33],
  [100, 93, 86, 79, 73, 67, 61, 55, 50, 44, 39, 34],
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
    { y: 7, x: 5 },
    { y: 9, x: 6 },
    { y: 10, x: 7 },
    { y: 12, x: 8 },
    { y: 14, x: 9 },
    { y: 15, x: 10 },
    { y: 20.5, x: 13 },
    { y: 22.5, x: 14 },
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
  let numberVolum = getRandomNumber(7, 14);
  y = numberVolum;
  if (numberVolum > 4) {
    y = 4;
  }
  let dt = getRandomNumber(numberVolum - 3, numberVolum - 1);
  //   console.log('сухий ', (numberVolum));
  //   console.log('вологий ', (dt));

  const tempDry = Math.round(interpolate(numberVolum));
  const tempWet = Math.round(interpolate(dt));
  const dtOri = tempDry - tempWet;
  console.log("сухий ", tempDry);
  console.log("вологий ", tempWet);
  const humidity = damples[tempDry][dtOri];
  console.log(humidity);

  const densitySaturation = densityDamp[tempDry];
  const density = (humidity * densitySaturation) / 100;

  document.getElementById("dt_ori").value = `${dtOri}`;
  document.getElementById("humidity_ori").value = `${humidity}`;
  document.getElementById("r1c2_ori").value = `${interpolate(numberVolum)}`;
  document.getElementById("r1c3_ori").value = `${interpolate(dt)}`;
  document.getElementById("density_ori").value = `${density}`;
  document.getElementById(
    "density_saturation_ori"
  ).value = `${densitySaturation}`;

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
