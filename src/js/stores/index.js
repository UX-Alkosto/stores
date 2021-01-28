export const stores = {
	get: async (jsonUrl = '') => {
		if (jsonUrl.length) {
			return await fetch(jsonUrl, {
				cache: 'force-cache',
				mode: 'cors'
			})
				.then(response => response.json())
				.then(data => data)
		}
	},
	getStoreFromUrl: (location = window.location) => {
		const url = new URL(location);
		let city, store, urlParams = url.pathname.split('/');
		urlParams.map((value, key) => {
			if (value.length) {
				if (value === 'tiendas') {
					city = urlParams[key + 1]
					store = urlParams[key + 2]
					if(store === 'c')
						store = urlParams[key + 3]
				}
			}
		})
		return { city, store }
	},
	isOpen: async (schedule = []) => {
		if (schedule.length) {
			const module = await import('./isopen.js')
			return module.isOpen(schedule)
		}
	},
	render: {
		detail : async ({
			address = '',
			howToGet = '',
			image = '',
			map = '',
			name = '',
			schedule = [],
			scheduleDetail = []
		}) => {
			const isOpen = await stores.isOpen(schedule)
			return `
			<div class="bg-tienda"></div>
			<div class="imagen_tienda">
				<img src="${image}" alt="${name}">
			</div>
			<div class="detalle_tienda">
				<div class="info_detalle">
					<h2>${name}</h2>
					<span class="direc">${address}</span>
					<p class="apertura ${isOpen.open ? 'verde' : 'rojo'}">${isOpen.message}</p>
					<span class="tit_horario">
						<i class="alk-icon-clock"></i>
						Horarios
					</span>
					<div class="horarios_detalle">
						${scheduleDetail.map(detail => `<p>${detail}</p>`).join('')}
					</div>
					<div class="links_detalle">
						${howToGet.length ? `<span><a href="${howToGet}" target="_blank" rel="noopener" title="Como llegar">
							<i class="alk-icon-arrive"></i>
							Como llegar
						</a></span>` : ''}
						${map.length ? `<span><a href="${map}" target="_blank" rel="noopener" title="Ver mapa">
							<i class="alk-icon-mapa"></i>
							Ver mapa
						</a></span>` : ''}
					</div>
				</div>
			</div>`;
		},
		store: async ({
			address = '',
			city = '',
			howToGet = '',
			label = '',
			link = '',
			external = false,
			name = '',
			schedule = []
		}) => {
			const isOpen = await stores.isOpen(schedule)
			return `<div class="store" data-city="${label}">
				<h2 class="ciudad_mun">${city}</h2>
				<div class="recuadroUno">
					<h3 class="nombre">
						<i class="alk-icon-nuestras-tiendas"></i>
						${name}
					</h3>
					<div class="ir">
						<a href="${link.length ? `${link}` : '#'}" target="${external ? '_blank' : '_self'}" rel="noopener" title="${name} - ${city}">
							<i class="alk-icon-arrow-right-square"></i>
						</a>
					</div>
				</div>
				<p class="direccionTienda">${address}</p>
				<p class="apertura ${isOpen.open ? 'verde' : 'rojo'}">${isOpen.message}</p>
				<div class="indicaciones">
					${link.length ? `<div class="ver_horario">
							<i class="alk-icon-mapa"></i>
							<a href="${link}" target="${external ? '_blank' : '_self'}" rel="noopener" title="Ver mapa y horarios">Ver mapa y horarios</a>
						</div>` : ''}
					${link.length ? `<!--<div class="comoLlegar">
							<i class="alk-icon-mapa"></i>
							<a href="${howToGet}" target="_blank" rel="noopener" title="Cómo llegar">Cómo llegar</a>
						</div>-->` : ''}
				</div>
				<a class="click" href="${link.length ? `${link}` : '#'}" target="${external ? '_blank' : '_self'}" rel="noopener" title="${name} - ${city}"></a>
			</div>`
		}
	}
}