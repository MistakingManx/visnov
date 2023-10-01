let sleep = t => new Promise(r => setTimeout(r, t * 1000));
class VisNovRender {
	constructor(parent, i) {
		this._i = i;
		this.parent = parent;
	}
	async show() {
		if (this._i.transitioning) {
			throw new Error("Attempted to transition the renderer while in a transition.");
		}
		this._i.transitioning = true;
		if (typeof(this._i.render) !== "object") throw new Error("Renderer is not present." + (this._i.transitioning = !1, ""));
		try {
			if (parseFloat(this._i.render.style.opacity||0) == 1) return !(this._i.transitioning = false);
			while(parseFloat(this._i.render.style.opacity) < 1) {
				this._i.render.style.opacity = parseFloat(this._i.render.style.opacity) + 0.01;
				await sleep(0.01);
			}
		} catch(e) {
			this._i.transitioning = false;
			return e;
		}
		return !(this._i.transitioning = false);
	}
	async hide() {
		if (this._i.transitioning) {
			throw new Error("Attempted to transition the renderer while in a transition.");
		}
		this._i.transitioning = true;
		if (typeof(this._i.render) !== "object") throw new Error("Renderer is not present." + (this._i.transitioning = !1, ""));
		try {
			if (parseFloat(this._i.render.style.opacity||0) == 0) return !(this._i.transitioning = false);
			while(parseFloat(this._i.render.style.opacity) > 0) {
				this._i.render.style.opacity = parseFloat(this._i.render.style.opacity) - 0.01;
				await sleep(0.01);
			}
		} catch(e) {
			this._i.transitioning = false;
			return e;
		}
		return !(this._i.transitioning = false);
	}
};
class VisNov {
	constructor() {
		this.info = this.information = this.meta = this.metadata = createVersionObject("0.0.1/1", 0);
		let i = {
			splash: document.getElementById("splash"),
			render: document.getElementById("render"),
		};
		this.render = this.renderer = new VisNovRender(this, i);
		this.ram = {
			
		};
	}	
};
function createVersionObject(vstr, vflav) {
	if (typeof(vstr) !== "string") return {};
	vflav = parseFloat(vflav || 0);
	let flavs = [
		"Dev",
		"Release",
		"Early Access",
		"Beta",
		"Alpha",
	];
	let o = {};
	o.version = vstr;
	o.vnum = parseFloat(vstr.replace(/\./g, "").replace(/\//g, "."));
	if (!isFinite(o.vnum) || isNaN(o.vnum)) { o.vnum = 0 }
	o.flavor = o.flavour = flavs[vflav] || flavs[0];
	return o;
}