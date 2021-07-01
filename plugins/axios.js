/*eslint-disable*/
export default function (ctx, inject) {
    let {
        app: { $axios },
    } = ctx;
const denetcimApi = $axios.create()
denetcimApi.defaults.withCredentials = true
denetcimApi.setBaseURL(process.env.apiURL)
inject('denetcimApi', denetcimApi)
}
