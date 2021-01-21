import { stores } from "./stores/index.js"
(() => {
	if (storesJsonFile) {
		stores.get(storesJsonFile).then(({ciudades}) => {
			const storesContainer = document.querySelector("#stores"),
				storesPromises = []

			Object.entries(ciudades).forEach(cityData => {
				const city = cityData[1], label = cityData[0]
				Object.values(city.tiendas).forEach(store => {
					storesPromises.push(stores.render.store({
						address: store.direccion,
						city: city.label,
						howToGet: store.como_llegar,
						label: `todas ${label}`,
						link: store.ir,
						name: store.nombre_tienda,
						schedule: store.horario_apertura
					}))
				})
			})
			Promise.all(storesPromises).then(storesHtml => {
				storesContainer.innerHTML = ""
				storesHtml.forEach(storeHtml => storesContainer.insertAdjacentHTML('beforeend', `${storeHtml}`))
			})
		})
	}
})();