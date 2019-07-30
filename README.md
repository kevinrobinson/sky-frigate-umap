# sky-frigate-umap

look at mobilenet embeddings with umap

![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-29%20at%203.06.42%20PM.png?v=1564427234825)
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2Fquantized.png?v=1564433830853)
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-29%20at%204.58.34%20PM.png?v=1564433939221)

## notes
the real idea here is to use this with TM models.  show the transformation that happens from an image being projecting into plain mobilenet embedding space and projecting into a trained TM space.

eg, https://cs.stanford.edu/people/karpathy/convnetjs/demo/classify2d.html but for the TM model you made, so you can see how your model's layer warps the mobilenet space

but need to shake the tires on umap a bit more first

## tiny imagenet
let's see what happens using [tiny imagenet](https://tiny-imagenet.herokuapp.com/), using a [sample of 1000 images](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2Fsample1000.zip?v=1564490246233)...
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-30%20at%206.28.23%20AM.png?v=1564489967002)
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-30%20at%207.15.25%20AM.png?v=1564489968092)
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-30%20at%206.26.27%20AM.png?v=1564489968472)

hmm, the accuracy is way lower...
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-30%20at%208.25.43%20AM.png?v=1564489977009)

to [stackoverflow](https://stackoverflow.com/questions/57271717/tensorflow-js-mobilenet-accuracy-by-image-resolution)...

but if we figure that out, or use another dataset, then we should be able to see if the embeddings cluster in umap's projection:
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-30%20at%208.31.47%20AM.png?v=1564489940227)

