// Global click delegation and application boot
document.addEventListener('click',e=>{const t=e.target,g=t.closest('[data-go]'),p=t.closest('[data-pick]'),y=t.closest('[data-play]');if(g)go(g.dataset.go,g.dataset.j?+g.dataset.j:undefined);else if(p)storyPick(p.dataset.pick,p.dataset.w);else if(y){S=baseState();S.wx=y.dataset.w;setStrat(y.dataset.play);go('sim')}});
nav();go(P?'dash':'onb');
