import { stores } from "./stores/index.js"
(() => {
	if (window.storesJsonFile) {
		const params = stores.getStoreFromUrl()
		stores.get(storesJsonFile).then(async ({ ciudades }) => {
			const store = ciudades[params.city].tiendas[params.store],
				storesContainer = document.querySelector("#stores"),
				storesDetails = document.querySelector(".contenedor_tienda_detalle"),
				storesPromises = [],
				cityLabel = document.querySelectorAll('.nombre-ciudad')

			console.log(ciudades[params.city].label)
			console.log(ciudades[params.store])
			storesContainer.innerHTML = ""
			cityLabel.forEach(label => label.innerHTML = ciudades[params.city].label)
			storesDetails.insertAdjacentHTML('beforeend', await stores.render.detail({
				address: store.direccion,
				howToGet: store.como_llegar,
				image: store.imagen,
				link: store.ir,
				map: store.ver_mapa,
				name: store.nombre_tienda,
				schedule: store.horario_apertura,
				scheduleDetail: store.horarios
			}))
			if (Object.keys(ciudades[params.city].tiendas).length > 1) {
				Object.entries(ciudades[params.city].tiendas).forEach(storeData => {
					const label = storeData[0];
					const store = storeData[1];
					if (label == params.store) return
					storesPromises.push(stores.render.store({
						address: store.direccion,
						city: ciudades[params.city].label,
						howToGet: store.como_llegar,
						label: `todas ${params.city}`,
						link: store.ir,
						name: store.nombre_tienda,
						schedule: store.horario_apertura
					}))
				})
				Promise.all(storesPromises).then(storesHtml => {
					storesContainer.innerHTML = ""
					storesHtml.forEach(storeHtml => storesContainer.insertAdjacentHTML('beforeend', `${storeHtml}`))
				})
			} else {
				document.querySelector('.tit_otras').remove()
			}
		})
	}
})();