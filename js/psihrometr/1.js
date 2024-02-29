function interpolate(value) {
    const points = [
      { x: 6, y: 8 },
      { x: 8, y: 12 },
      { x: 10, y: 15 },
      { x: 12, y: 19 },
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
  
  // Приклад використання
  console.log("Інтерпольоване значення для x = 12:", interpolate(12));
  console.log("Інтерпольоване значення для x = 10:", interpolate(10));
  console.log("Інтерпольоване значення для x = 8:", interpolate(8));
  console.log("Інтерпольоване значення для x = 6:", interpolate(6));
  console.log("Інтерпольоване значення для x = 9:", interpolate(9));
  console.log("Інтерпольоване значення для x = 17:", interpolate(17));
  

  