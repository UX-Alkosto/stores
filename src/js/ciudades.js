import { stores } from "./stores/index.js"
(() => {
	if (storesJsonFile) {
		const params = stores.getStoreFromUrl()
		stores.get(storesJsonFile).then(({ciudades}) => {
			const city = ciudades[params.city], label = ciudades[params.city][0],
				storesContainer = document.querySelector("#stores"),
				storesPromises = []

			if (Object.keys(ciudades[params.city].tiendas).length > 1) {
				Object.values(city.tiendas).forEach(store => {
					storesPromises.push(stores.render.store({
						address: store.direccion,
						city: city.label,
						howToGet: store.como_llegar,
						label: label,
						link: store.ir,
						name: store.nombre_tienda,
						schedule: store.horario_apertura
					}))
				})
				Promise.all(storesPromises).then(storesHtml => {
					storesContainer.innerHTML = ""
					storesHtml.forEach(storeHtml => storesContainer.insertAdjacentHTML('beforeend', `${storeHtml}`))
				})
			}
		})
	}
})();