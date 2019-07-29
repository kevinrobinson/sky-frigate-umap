var _ = window._;

// const SEEKING_ZERO = (window.location.search.indexOf('?seekzero') === 0);
// const SHOULD_NOTIFY = (window.location.search.indexOf('?notify') === 0);

function rgbaify(quad) {
  return `rgba(${quad[0]},${quad[1]},${quad[2]},${quad[3]})`;
}


function createMutantCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  canvas.style.width = '256px';
  canvas.style.height = '256px';
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
    img.src = `https://picsum.photos/256/256?${imageKey}`
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
  })))).map((item, index) => { return {...item, i: index}; }); // re-index
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
  const [width, height] = [800, 800];
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
  const plots =_.compact(await Promise.all(xys.map(async (pair, i) => {
    const [xp, yp] = [
      (pair[0] - xRange[0])/xSpan,
      (pair[1] - yRange[0])/ySpan
    ];
    const [x, y] = [
      width * xp,
      height * yp
    ];
    
    const item = (items[i]);
    if (!item) return null;
    
    return {x, y, i, item};
  })));
  console.log('plots.length', plots.length);
  
  
  // plain images
  plots.forEach(plot => {
    const {x, y, item} = plot;
    const {uri, prediction} = item;
    addImage(uri, div, x, y, 32, 32, prediction);
  });
  
  
  // facets
  const facetsEl = document.createElement('div');
  document.body.appendChild(facetsEl);
  facets(div, plots);
}


function addImage(uri, el, x, y, width, height, prediction) {
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
  img.addEventListener('click', () => alert(JSON.stringify(prediction, null, 2)));
}

async function drawImage(uri, ctx, x, y, width, height, prediction) {
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = async function() {
      ctx.drawImage(img, x, y, width, height);
      resolve();
    }
    img.src = uri;
  });
}

main();





function textLabelForClassName(className) {
  return 'score ' + className;
}

async function facets(targetEl, plots) {
  // flatten data, round numbers for UX
  const facetsData = plots.map(function(plot, i) {
    const {x, y, item} = plot;
    const classification = _.maxBy(item.prediction, 'probability').className;
    const labels = item.prediction.reduce((map, p) => {
      return {
        ...map,
        [textLabelForClassName(p.className)]: parseFloat(p.probability.toFixed(4))
      };
    }, {});
    return {
      i,
      x,
      y,
      classification,
      hashedURI: hash64(item.uri),
      // source: item.source || 'uknown',
      // filename: item.filename,
      // filenameLabel: item.filenameLabel,
      // searchQuery: item.query,
      // elapsedSeconds: item.elapsedSeconds,
      // ...labels
    };
  });
  // const classNames = _.uniq(_.flatMap(items, item => item.prediction.map(p => p.className)));
  const items = plots.map(plot => plot.item);

  // create or grab the polymer el
  var facetsDiveEl = targetEl.querySelector('facets-dive');
  var didCreate = false;
  if (!facetsDiveEl) {
    const el = document.createElement('div');
    el.innerHTML = '<facets-dive width="1200" height="800" />';
    el.style.width = '1200px';
    el.style.height = '800px';
    targetEl.appendChild(el);
    facetsDiveEl = targetEl.querySelector('facets-dive');
    didCreate = true;
  }

  // the order of these calls matters
  // only set defaults; otherwise let user interactions stick through renders
  facetsDiveEl.data = facetsData;
  facetsDiveEl.infoRenderer = facetsInfoRenderer.bind(null, items);
  if (didCreate) {
    facetsDiveEl.hideInfoCard = false;
    // facetsDiveEl.verticalFacet = textLabelForClassName(classNames[0]);
    // facetsDiveEl.verticalBuckets = 4;
    // facetsDiveEl.horizontalFacet = 'searchQuery';
    // facetsDiveEl.tweenDuration = 0;
    // facetsDiveEl.fadeDuration = 0;
  }
  
  // sprite sheet
  // see https://github.com/PAIR-code/facets/tree/master/facets_dive#providing-sprites-for-dive-to-render
  // 64x64 is the assumption
  const {canvas, uri} = await createFacetsAtlas(items, 64, 64);
  // console.log('uri', uri);
  // document.body.appendChild(canvas);
  facetsDiveEl.atlasUrl = uri;
  facetsDiveEl.spriteImageWidth = 64;
  facetsDiveEl.spriteImageHeight = 64;
}

async function createFacetsAtlas(items, width, height) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  const cols = Math.ceil(Math.sqrt(items.length));
  canvas.width = cols * width;
  canvas.height = cols * width;
  await Promise.all(items.map((item, index) => {
    const x = width * (index % cols);
    const y = height * Math.floor(index / cols);
    const img = new Image();
    return new Promise(function(resolve, reject) {
      img.onload = function() {
        context.drawImage(img, x, y, width, height);
        resolve();
      };
      img.crossOrigin = 'Anonymous'; // allow images from search
      img.src = item.uri;
    });
  }));
  
  const uri = canvas.toDataURL();
  return {canvas, uri};
}

// see https://github.com/PAIR-code/facets/blob/967e764dd8fbc8327ba9d4e39f3c0d76dce834b9/facets_dive/lib/info-renderers.ts#L26
function facetsInfoRenderer(items, selectedObject, elem) {
  // copied
  const dl = document.createElement('dl');
  
  // inserted
  const item = _.find(items, item => hash64(item.uri) === selectedObject.hashedURI);
  if (item) {
    const img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.src = item.uri;
    img.style.width = '100%';
    dl.appendChild(img);
  }
  
  // copied
  for (const field in selectedObject) {
    // modified
    if (['i', 'hashedURI'].indexOf(field) !== -1) {
      continue;
    }
    if (!selectedObject.hasOwnProperty(field)) {
      continue;
    }
    // modified
    if (selectedObject[field] === undefined) {
      continue;
    }
    
    const dt = document.createElement('dt');
    dt.textContent = field;
    dl.appendChild(dt);
    const dd = document.createElement('dd');
    dd.textContent = selectedObject[field];
    dl.appendChild(dd);
  }
  
  elem.appendChild(dl);
};


function hash64(str) {
  return window.CryptoJS.MD5(str).toString(window.CryptoJS.enc.Base64);
}