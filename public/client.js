var _ = window._;

// const SEEKING_ZERO = (window.location.search.indexOf('?seekzero') === 0);
// const SHOULD_NOTIFY = (window.location.search.indexOf('?notify') === 0);

function rgbaify(quad) {
  return `rgba(${quad[0]},${quad[1]},${quad[2]},${quad[3]})`;
}


function createMutantCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  canvas.style.width = '128px';
  canvas.style.height = '128px';
  const ctx = canvas.getContext('2d');
  return {canvas, ctx};
}

async function newClipartCanvas() {
  const {canvas, ctx} = createMutantCanvas();
  
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  return new Promise((resolve, reject) => {
    const imageKey = Math.floor(Math.random() * 1000000);
    img.onload = async function() {
      ctx.drawImage(img, 0, 0);
      resolve({canvas, imageKey});
    }
    img.onerror = function() {
      reject();
    }
    img.src = `https://picsum.photos/128/128?${imageKey}`
  });
}


async function main() {
  const model = await window.mobilenet.load();
  const items = _.compact(await Promise.all(_.compact(_.range(0, 50).map(async i => {
    try {
      const {canvas, imageKey} = await newClipartCanvas();
      const uri = canvas.toDataURL()
      // sessionStorage.setItem('imageKeys', (sessionStorage.getItem('imageKeys') || []).concat(imageKey));
      // sessionStorage.setItem(`image:${imageKey}`, uri);
      const embedding = (await model.infer(canvas)).arraySync()[0];
      const prediction = await model.classify(canvas);
      return {i, uri, embedding, prediction};
    } catch(err) {
      console.error('err', err);
      return null;
    }
  }))));
  window.items = items;
  // sessionStorage.setItem('items', JSON.stringify(items));
  console.log('items', JSON.stringify(items));
  console.log('items.length', items.length);
  
  
  const embeddings = _.compact(items).map(item => item.embedding);
  const umap = new (window.UMAP)();
  const xys = umap.fit(embeddings);
  window.xys = xys;
  sessionStorage.setItem('xys', JSON.stringify(xys));
  console.log('xys', xys);
  
  // const xys = [[0.4284397105447379,0.15015865313115387],[0.680073231324413,1.3278580186410474],[0.9624455321830602,1.645884532306784],[-1.5547828643950092,1.2822192743611105],[0.6240947565205439,0.4132189100374853],[-1.5094821227551507,2.6712109385032514],[0.29743841737878834,-0.6882442313840826],[-2.65549149857656,0.5982589258960724],[-0.955575824512057,1.539378883472938],[0.4310355898567515,-0.4726287893809538],[-1.2813331684774543,1.8331457396209883],[-2.847691746197866,-0.5619630489462858],[0.13702121242997237,-1.2985425705120244],[-2.085461341631829,2.204382257828009],[-0.13204133307240293,1.4837989969683416],[-2.1615269356196842,0.3476603173448807],[0.9835278372654105,1.9965701995757497],[-1.9663498917753717,-0.7757215821977863],[0.4781311816427814,-1.094829780893278],[-1.5017504809271371,0.31784611004618907],[-1.830948038535596,2.3031588096033584],[-0.684012712593584,-0.009539525572085858],[-2.4078137727964255,2.033347786615734],[-0.5206331379880236,-0.2185441186199623],[-0.7820608510627591,2.898524575372889],[0.2953484733241113,0.9439750970666576],[-2.224113725129066,1.8891868931968225],[-2.6965995106229426,0.9232660281411526],[0.18431676901508118,2.6280977761973996],[0.0034015084604797838,2.939101986009315],[-1.8298432317688282,-0.7190271662849377],[0.14588125594049955,1.784146198509298],[-0.05133460927529372,2.0177185316946433],[0.10541008220217478,0.7869267689014902],[-0.5498504404291779,2.1181804628043137],[0.7190476732791801,2.332877514553211],[-0.5620047781342491,-0.1854330643116511],[-2.498134057462561,0.13994143096979925],[-1.5585348527421912,-0.30193544635021435],[-0.34717872533850136,3.3963931257862603],[-2.0170545480125597,1.3957890101117063],[-0.5680957340909691,0.2598126704047813],[-0.33554780462944017,3.3303874658780823],[-0.520813597132188,2.7846178849503804],[-1.8094651597832814,1.6200617695688444],[0.8282311969053596,2.521434855194406],[-1.0875970536955295,0.8988082841596894],[0.015428609599595767,-1.3629061269706475],[-2.506615596010353,-0.6240346769484602],[-0.3573950009329279,0.6224435762346098],[-1.6205710870755083,2.5314381524364054],[-2.455391026781271,0.8891230088752303],[-2.638778617365974,-0.2425269263844258],[-0.48722801113383735,0.9505337148438918],[-1.3487790159226376,-0.8300803123494493],[-1.2916366906230672,-0.5783928792301896],[-0.9418696555530314,0.882007659388623],[0.5041313639414204,2.8370027731213274],[-0.2517090262287235,-0.7475426992053559],[0.3218735690875689,0.2817604711179398],[-1.9629450791589884,0.22142595886945182],[-1.7455384830432912,2.294321349587453],[0.020193674926715997,-0.1409167502526014],[-0.6308685505318096,1.486734336620527],[0.014689409909484965,-0.7840439072426753],[0.8140255525216618,2.9579235411505382],[-1.3251016505382542,2.465090433035594],[-1.8181985781880934,-0.14408258136047825],[-1.4210891605493572,0.17525025688346094],[-1.8370003115626696,2.4417241616194247],[-1.9091297022483575,-0.2980438604684933],[0.4504826402066628,1.9096631416181782],[-2.3558490038746434,-0.5728402079390578],[0.2169122041280122,2.4432696339405435],[0.11317019829253859,-0.9275393314526543],[0.5834788765656461,2.868852757207336],[-0.07581186692535734,1.349694397165651],[-0.3568692414773518,3.357030483004608],[-0.5831390398136164,1.7032981188296032],[-0.08045290457739956,-1.1090049278040663],[-1.4251892354849753,-1.1036147709472095],[-2.5896522550144616,0.12860490640899316],[0.5642687480256905,-0.9482461007178551],[0.04802708418384767,-0.9627289997889706],[-0.3572481204042833,2.6283777598566385],[-1.1932766117932267,2.2790940430372797],[0.5883925066086643,0.8281079632622182],[0.08600732064679915,1.2224017927037996],[-0.712976023020023,-0.7959936303604167],[-0.2969759659257373,-1.3165673488990055],[-0.38462980134365415,2.456495315497017],[-2.349612104235415,-0.07102233461661825],[-0.993097438233826,0.16136694697339474],[0.4359032622134886,1.702636381040905],[-2.2320721713948735,1.178980472158731],[-2.134820312518605,1.2942703104398472],[-2.4537795960056172,-0.44986413236471634],[-1.5838193798816265,1.9109412006813926]];
  // window.xys = xys;
  
  // canvas
  // const [width, height] = [600, 600];
  // const canvas = document.createElement('canvas');
  // const ctx = canvas.getContext('2d');
  // canvas.width = width;
  // canvas.height = height;
  // canvas.style.width = width + "px";
  // canvas.style.height = height + "px";
  // document.body.appendChild(canvas);
  
  // html
  const [width, height] = [600, 600];
  const div = document.createElement('div');
  div.style.position = 'relative';
  div.style.background = '#f8f8f8f';
  div.style.width = width + "px";
  div.style.height = height + "px";
  document.body.appendChild(div);
  
  // range
  const xRange = [
    _.min(xys.map(xy => xy[0])),
    _.max(xys.map(xy => xy[0]))
  ];
  const xSpan = (xRange[1] - xRange[0]);
  console.log('xRange', xRange, xSpan);
  const yRange = [
    _.min(xys.map(xy => xy[1])),
    _.max(xys.map(xy => xy[1]))
  ];
  const ySpan = (yRange[1] - yRange[0]);
  console.log('yRange', yRange, ySpan);
  
  // plots
  xys.forEach(async (pair, i) => {
    const [xp, yp] = [
      (pair[0] - xRange[0])/xSpan,
      (pair[1] - yRange[0])/ySpan
    ];
    const [x, y] = [
      width * xp,
      height * yp
    ];
    // console.log('coord', pair[0], pair[1], xp, yp, '/', x, y, i, percent);
    // console.log('huh', pair[0], pair[0] - xRange[0], ((pair[0] - xRange[0])/xSpan));
    // ctx.drawImage(img, 0, 0);
    
    const item = (items[i]);
    const {prediction, uri} = item;
    if (uri) {
      // await drawImage(uri, ctx, x, y, 32, 32);
      addImage(uri, div, x, y, 32, 32, prediction);
    } else {
      // const r = Math.round(255 * (i / xys.length));
      // const r = 255;
      // ctx.fillStyle = rgbaify([r, 0, 0, 1]);
      // ctx.fillRect(x, y, 4, 4);
    }
  });
}

function addImage(uri, el, x, y, width, height) {
  const img = document.createElement('img');
  el.appendChild(img);
  img.style.position = 'absolute';
  img.style.left = x + 'px';
  img.style.top = y + 'px';
  img.style.width = width;
  img.style.height = height;
  img.width = width;
  img.height = height;
  img.src = uri;
}

async function drawImage(uri, ctx, x, y, width, height, prediction) {
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = async function() {
      ctx.drawImage(img, x, y, width, height);
      resolve();
    }
    img.src = uri;
    img.addEventListener('click', () => alert(JSON.stringify(prediction, null, 2)));
  });
}

main();

// async function main() {
//   // load model before anything
//   const model = await window.mobilenet.load();
  
//   // state
//   var aborted = false;
//   var i = 0;
//   var foundClassNames = {};
//   var embeddings = [];
  
//   function newline() {
//     const br = document.createElement('br');
//     document.querySelector('#out').appendChild(br);
//   }
  
//   const projectionEl = document.createElement('div');
//   document.querySelector('#out').appendChild(projectionEl);
  
//   // loop
//   async function iteration(parent) {
//     // explore
//     const EXPLORATIONS = 10; // essentially tunes the level of feedback during iterations
//     const paths = await Promise.all(_.range(0, EXPLORATIONS).map(async n => {
//       // try different mutations here
//       // const mutant = rectMutation(parent);
//       const mutant = pixelMutation(parent);
//       const predictions = await model.classify(mutant);
//       const embedding = await model.infer(mutant);
//       embeddings.push(embedding);
      
//       // highest not yet found
//       const prediction = predictions.filter(prediction => !foundClassNames[prediction.className])[0];
//       const p = prediction.probability;
//       const className = prediction.className;
            
//       return {mutant, predictions, p, className, n};
//     }));
//     const debug = paths.map(path => { return {p: path.p, className: path.className }; });
//     const choice = (SEEKING_ZERO ? _.minBy: _.maxBy)(paths, path => path.p);
//     const {mutant, p, predictions, className, n} = choice;
    
//     // decide
//     i++;
//     const next = action(foundClassNames, {i, p, className, mutant, parent});
    
//     // render
//     const blockEl = createBlockEl(i, choice, paths, next);
//     document.querySelector('#out').appendChild(blockEl);
    
//     // act
//     if (aborted) {
//       return;
//     }
//     if (next.wat === 'done') {
//       return;
//     }
//     if (next.wat === 'found') {
//       foundClassNames[next.params.className] = true;
//       console.log('> found' + next.params.className);
//       project(projectionEl, embeddings);
//       notify({
//         i,
//         p,
//         predictions,
//         className: next.params.className,
//         dataURL: mutant.toDataURL(),
//         config: {EXPLORATIONS}
//       });
//       newline();
//       return iteration(await newClipartMutation());
//     }
//     if (next.wat === 'continue') {
//       return iteration(next.params.mutant);
//     }
//     if (next.wat === 'diverge') {
//       newline();
//       return iteration(await newClipartMutation());
//     }
//   }

//   // abort, start with new image
//   document.querySelector('#own-image').addEventListener('click', async e => {
//     e.preventDefault();
//     const url = prompt("What image URL?\n\neg: https://cdn.glitch.com/7fcf14f2-d9c4-4b34-a78e-e77543df038a%2FScreen%20Shot%202019-07-25%20at%2012.26.04%20PM.png?v=1564071974428");
//   if (!url) return;  
    
//     window.history.pushState({}, '', '?url=' + encodeURIComponent(url));
//     // hacky restart
//     aborted = true;
//     setTimeout(async () => {
//       i = 0;
//       foundClassNames = {};
//       aborted = false;
//       newline();
//       iteration(await fromImageURL(url));
//     }, 1000);
//   });

//   // startup
//   if (window.location.search.indexOf('?url=') === 0) {
//     const url = decodeURIComponent(window.location.search.slice(5));
//     iteration(await fromImageURL(url));
//   } else {
//     iteration(await newClipartMutation());
//   }
// }


// function action(foundClassNames, params) {
//   const {i, p, className, mutant, parent} = params;
//   if (i > 1000) return {wat: 'done'};
//   if (SEEKING_ZERO && p < 0.05) return {wat:'found', params};
//   if (!SEEKING_ZERO && p > 0.99) return {wat:'found', params};
//   if (!foundClassNames[className]) return {wat:'continue', params};
//   return {wat:'diverge', params}
// }


// function createBlockEl(i, choice, paths, next) {
//   const {mutant, p, predictions, className, n} = choice;
  
//   const blockEl = document.createElement('div');
//   blockEl.classList.add('Block');

//   // render explorations
//   const exploreEl = document.createElement('div');
//   exploreEl.classList.add('Block-explore');
//   paths.filter(path => path.n !== n).forEach(path => {
//     path.mutant.style.width = Math.ceil(200 / (paths.length -1)) + 'px';
//     path.mutant.style.height = Math.ceil(200 / (paths.length - 1)) + 'px';
//     exploreEl.appendChild(path.mutant);
//   });
//   // exploreEl.style.zoom = 
//   blockEl.appendChild(exploreEl);

//   // mutant
//   const mutantEl = document.createElement('div');
//   mutantEl.classList.add('Block-mutant');
//   // mutantEl.style.opacity = p;
//   mutantEl.appendChild(mutant);
//   const json = JSON.stringify({
//     i,
//     wat: next.wat,
//     p,
//     predictions
//   }, null, 2);

//   // label and line
//   const labelEl = document.createElement('div');
//   labelEl.classList.add('Block-label');
//   labelEl.style.opacity = SEEKING_ZERO ? 1-p : p;
//   labelEl.innerText = p.toFixed(3) + '  ' + className;
//   labelEl.title = json;
//   mutantEl.appendChild(labelEl);

//   const line = document.createElement('div');
//   line.classList.add('Block-line');
//   line.style.width = Math.round(200 * p).toFixed(0) + 'px';
//   mutantEl.appendChild(line);

//   // debug
//   // const pre = document.createElement('pre');
//   // pre.innerHTML = json;
//   // pre.style['overflow'] = 'hidden';
//   // div.appendChild(pre);

//   blockEl.appendChild(mutantEl);
  
//   return blockEl;
// }


// function createMutantCanvas() {
//   const canvas = document.createElement('canvas');
//   canvas.width = 200;
//   canvas.height = 200;
//   canvas.style.width = '200px';
//   canvas.style.height = '200px';
//   const ctx = canvas.getContext('2d');
//   return {canvas, ctx};
// }


// // discard input altogether
// async function newClipartMutation(parent = null, options = {}) {
//   const {canvas, ctx} = createMutantCanvas();
  
//   // https://picsum.photos/200/200?i
//   const img = new Image();
//   const i = Math.random();
//   return new Promise((resolve, reject) => {
//     img.onload = async function() {
//       status('making trouble!');
//       ctx.drawImage(img, 0, 0);
//       resolve(canvas);
//     }
//     img.crossOrigin = 'Anonymous';
//     status('starting up...');
//     img.src = `https://picsum.photos/200/200?${i}`
//   });
// }

// async function fromImageURL(url) {
//   const img = new Image();
//   return new Promise((resolve, reject) => {
//     img.onload = function() {
//       const {canvas, ctx} = createMutantCanvas();
      
//       // unsmart resizing
//       ctx.drawImage(img,
//         0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
//         img.width, img.height,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
//         0, 0,     // Place the result at 0, 0 in the canvas,
//         200, 200); // With as width / height: 100 * 100 (scale)
//       resolve(canvas);
//     };
//     img.crossOrigin = 'Anonymous';
//     img.src = url;
//   });
// }

// // modify pixels
// function pixelMutation(parent, options = {}) {
//   const pixels = options.pixels || 10;
//   const modRange = options.modRange || 255/4;
//   const opacityRange = options.opacityRange || 255/4;
//   const dx = options.dx || 2;
//   const dy = options.dy || 2;
  
//   const {canvas, ctx} = createMutantCanvas();
//   const data = parent.getContext('2d').getImageData(0, 0, 200, 200);
//   ctx.putImageData(data, 0, 0);

//   _.range(0, pixels).forEach(n => {
//     const x = Math.round(Math.random() * canvas.width);
//     const y = Math.round(Math.random() * canvas.height);
//     const [r, g, b] = ctx.getImageData(x, y, 1, 1).data  
//     const deltaX = Math.round(Math.random() * dx);
//     const deltaY = Math.round(Math.random() * dy);
//     const color = rgbaify([
//       clampAndRound((r-modRange) + (Math.random()* modRange*2)),
//       clampAndRound((g-modRange) + (Math.random()* modRange*2)),
//       clampAndRound((b-modRange) + (Math.random()* modRange*2)),
//       Math.round(Math.random()* opacityRange)
//     ]);
//     ctx.fillStyle = color;
//     ctx.fillRect(x+deltaX, y+deltaY, 1, 1);
//   });
  
//   return canvas;
// }

// // color rectangles
// function rectMutation(parent, options = {}) {
//   const draws = options.draws || 1;
//   const min = options.min || 1;
//   const range = options.range || 2;
  
//   const {canvas, ctx} = createMutantCanvas();
//   const data = parent.getContext('2d').getImageData(0, 0, 200, 200);
//   ctx.putImageData(data, 0, 0);
  
//   // draw colored rects
//   _.range(0, draws).forEach(i => {
//     const color = pickMutantColor(canvas, ctx, options);  
//     ctx.fillStyle = color;
//     const w = Math.round(Math.random() * range) + min;
//     const x = Math.round((canvas.width - w) * Math.random());
//     const y = Math.round((canvas.height - w) * Math.random());
//     ctx.fillRect(x, y, w, w);
//   });
  
//   return canvas;
// }

// function pickMutantColor(canvas, ctx, options = {}) {
//   const mode = options.mode || 'drawn-and-modified';
  
//   // with color drawn from image
//   if (mode === 'drawn') {
//     return rgbaify(sampleColor(canvas, ctx).concat([
//       Math.round(Math.random()*255/4) // err towards less strong
//     ]));
//   }

//   // color drawn from image and modified (eg, 1/4th)
//   if (mode === 'drawn-and-modified') {
//     const [r,g,b] = sampleColor(canvas, ctx);
//     const data = parent.getContext('2d').getImageData(0, 0, 200, 200);
//     ctx.putImageData(data, 0, 0);
//     const modRange = 255/4;
//     return rgbaify([
//       clampAndRound((r-modRange) + (Math.random()* modRange*2)),
//       clampAndRound((g-modRange) + (Math.random()* modRange*2)),
//       clampAndRound((b-modRange) + (Math.random()* modRange*2)),
//       Math.round(Math.random()*255/4) // err towards less strong
//     ]);
//   }

//   // white, transparent-ish
//   if (mode === 'white-ish') {
//     return rgbaify([
//       255,
//       255,
//       255,
//       Math.round(Math.random()*255/4) // err towards less strong
//     ]);
//   }
  
//   // random, transparent-ish
//   return rgbaify([
//     Math.round(Math.random()*255),
//     Math.round(Math.random()*255),
//     Math.round(Math.random()*255),
//     1
//   ]);
// }

// function clampAndRound(r) {
//   return Math.round(Math.max(0, Math.min(r, 255)));
// }

// function sampleColor(canvas, ctx) {
//   const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const pixelCount = frame.data.length / 4;
//   const i = Math.round(Math.random() * pixelCount);
//   return [
//     frame.data[i * 4 + 0],
//     frame.data[i * 4 + 1],
//     frame.data[i * 4 + 2]
//   ];
// }

// function rgbaify(quad) {
//   return `rgba(${quad[0]},${quad[1]},${quad[2]},${quad[3]})`;
// }

// function status(msg) {
//   document.querySelector('#status').innerText = msg;
// }

// function notify(json) {
//   if (!SHOULD_NOTIFY) return;
  
//   return fetch('/image', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(json)
//   }).catch(err => console.error('notify failed', err, json));
// }

// main();


// function project(projectionEl, tensors) {
//   projectionEl.style.width = '800px';
//   projectionEl.style.height = '800px';
  
//   console.log('umap...');
//   const umap = new (window.UMAP)();
//   const mnetEmbeddings = tensors.map(tensor => tensor.arraySync()[0]);
//   window.mnetEmbeddings = mnetEmbeddings;
  
//   // umap.fitAsync(mnetEmbeddings, epochNumber => {
//   //   console.log('fitting...', epochNumber);
//   // }).then(umapEmbeddings => {
//   //   console.log('umapEmbeddings', umapEmbeddings);
//   //   window.umapEmbeddings = umapEmbeddings;
//   // })
//   const umapEmbeddings = umap.fit(mnetEmbeddings);
//   console.log('umapEmbeddings', umapEmbeddings);
//   window.umapEmbeddings = umapEmbeddings;
// }