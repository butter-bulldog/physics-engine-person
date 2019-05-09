const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;


// エンジン作成
const engine = Engine.create(),
    world = engine.world;

// 描画設定
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,             // ステージの横幅
    height: 600,            // ステージの高さ
    background: '#000000',  // ステージの背景色
    wireframes: false       // ワイヤーフレームモードをオフ
  }
});
Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);


// 丸
const circle = Bodies.circle(375, 100, 46, {
  restitution: 1, // バウンド
  render: {
    sprite: {
      texture: './img/ball.png'
    }
  },
});

// 四角
const box = Bodies.rectangle(450, 50, 80, 80);

// 地面
const ground = Bodies.rectangle(400, 610, 810, 120, { isStatic: true });

// 丸と四角と地面を追加
World.add(world, [
  circle,
  box,
  ground
]);


// 壁を追加
World.add(world, [
  Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
  Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);


// マウスドラッグ可能に
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});
World.add(engine.world, mouseConstraint);
render.mouse = mouse;

