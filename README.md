# sky-frigate-umap

look at mobilenet embeddings with umap

![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-29%20at%203.06.42%20PM.png?v=1564427234825)
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2Fquantized.png?v=1564433830853)
![](https://cdn.glitch.com/06488acb-6894-42aa-aeb0-63a6f8cfb89d%2FScreen%20Shot%202019-07-29%20at%204.58.34%20PM.png?v=1564433939221)

## notes
the real idea here is to use this with TM models.  show the transformation that happens from an image being projecting into plain mobilenet embedding space and projecting into a trained TM space.

eg, https://cs.stanford.edu/people/karpathy/convnetjs/demo/classify2d.html but for the TM model you made, so you can see how your model's layer warps the mobilenet space

but need to shake the tires on umap a bit more first