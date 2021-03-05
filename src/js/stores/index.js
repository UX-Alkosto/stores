function log(message, type = "") {
	let color = "";
	switch (type) {
		case "error":
			color = "#dd171b";
			break;
		case "info":
			color = "#2450f9";
			break;
		case "warning":
			color = "#e4a003";
			break;
		default:
			color = "#2ecc71";
			break;
	}
	const logStyles = `background: ${color}; border-radius: 0.5em;color: white; font-weight: bold; padding: 2px 0.5em`;
	return console.log("%cStores", logStyles, message);
}

class Stores {
	constructor(json = undefined) {
		this.json = json;
	}

	get stores() {
		return this.getStores();
	}

	async getStores() {
		if (this.json.length) {
			return await fetch(this.json, {
				cache: "force-cache",
				mode: "cors"
			}).then(response => {
				if (response.ok) return response.json();
				else throw `Unable to load Json file ${this.json}`;
			}).then(data => data);
		} else {
			throw `Unable to load Json file ${this.json}`;
		}
	}

	static getStoreFromUrl() {
		const url = new URL(window.location);
		let city, store, urlParams = url.pathname.split("/");
		urlParams.map((value, key) => {
			if (value.length) {
				try {
					if (value === "tiendas") {
						city = urlParams[key + 1];
						store = urlParams[key + 2];
						if (store === "c")
							store = urlParams[key + 3];
					} else if (value === "nuestras-tiendas") {
						city = urlParams[key + 1];
						store = urlParams[key + 2];
					}
				} catch (error) {
					log(error, "error");
				}
			}
		});
		return {
			city,
			store
		};
	}
}

class Store {
	constructor({
		address = "",
		city = "",
		howToGet = "",
		image = "",
		label = "",
		link = "",
		external = false,
		map = "",
		name = "",
		order = 0,
		schedule = [],
		scheduleDetail = []
	}) {
		this.address = address;
		this.city = city;
		this.external = external;
		this.howToGet = howToGet;
		this.image = image;
		this.label = `todas ${label}`;
		this.link = link;
		this.map = map;
		this.name = name;
		this.order = order;
		this.schedule = schedule;
		this.scheduleDetail = scheduleDetail;
	}

	get isOpen() {
		return this._isOpen();
	}

	async render(type = "store") {
		const isOpen = await this.isOpen;
		switch (type) {
			case "detail":
				return `
			<div class="bg-tienda"></div>
			<div class="imagen_tienda">
				<img src="${this.image}" alt="${this.name}">
			</div>
			<div class="detalle_tienda">
				<div class="info_detalle">
					<h2>${this.name}</h2>
					<span class="direc">${this.address}</span>
					<p class="apertura ${isOpen.open ? "verde" : "rojo"}">${isOpen.message}</p>
					<span class="tit_horario">
						<i class="alk-icon-clock"></i>
						Horarios
					</span>
					<div class="horarios_detalle">
						${this.scheduleDetail.map(detail => `<p>${detail}</p>`).join("")}
					</div>
					<div class="links_detalle">
						${this.howToGet.length ? `<span><a href="${this.howToGet}" target="_blank" rel="noopener" title="Como llegar">
							<i class="alk-icon-arrive"></i>
							Como llegar
						</a></span>` : ""}
						${this.map.length ? `<span><a href="${this.map}" target="_blank" rel="noopener" title="Ver mapa">
							<i class="alk-icon-mapa"></i>
							Ver mapa
						</a></span>` : ""}
					</div>
				</div>
			</div>`;
			default:
				return `<div style="order: ${this.order}" class="store" data-city="${this.label}">
				<h2 class="ciudad_mun">${this.city}</h2>
				<div class="recuadroUno">
					<h3 class="nombre">
						<i class="alk-icon-nuestras-tiendas"></i>
						${this.name}
					</h3>
					<div class="ir">
						<a href="${this.link.length ? `${this.link}` : "#"}" target="${this.external ? "_blank" : "_self"}" rel="noopener" title="${this.name} - ${this.city}">
							<i class="alk-icon-arrow-right-square"></i>
						</a>
					</div>
				</div>
				<p class="direccionTienda">${this.address}</p>
				<p class="apertura ${isOpen.open ? "verde" : "rojo"}">${isOpen.message}</p>
				<div class="indicaciones">
					${this.link.length ? `<div class="ver_horario">
							<i class="alk-icon-mapa"></i>
							<a href="${this.link}" target="${this.external ? "_blank" : "_self"}" rel="noopener" title="Ver mapa y horarios">Ver mapa y horarios</a>
						</div>` : ""}
					${this.link.length ? `<!--<div class="comoLlegar">
							<i class="alk-icon-mapa"></i>
							<a href="${this.howToGet}" target="_blank" rel="noopener" title="Cómo llegar">Cómo llegar</a>
						</div>-->` : ""}
				</div>
				<a class="click" href="${this.link.length ? `${this.link}` : "#"}" target="${this.external ? "_blank" : "_self"}" rel="noopener" title="${this.name} - ${this.city}"></a>
			</div>`;
		}
	}

	async _isOpen() {
		return (await import("./isopen.js")).isOpen(this.schedule);
	}
}

export {
	Stores,
	Store,
	log
};