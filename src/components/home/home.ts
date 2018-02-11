import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'
// import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
import axios, { AxiosResponse } from 'axios'

import './home.scss'
import { GIFObject } from '../../../typings/giphy-api'

@Component({
  template: require('./home.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
    // 'b-form-input': bFormInput
  }
})
export class HomeComponent extends Vue {

  limit: number = 3
  rating: string = 'PG'
  apiKey: string = process.env.API_KEY
  // url: string = `https://api.giphy.com/v1/gifs/search?api_key=ym2pFZMXbQklfz1ynyx6AFy2BEpSzvaM&q=panda`
  items: Array<GIFObject> = []
  searchTerm: string
  protected axios

  constructor () {
    super()
    this.axios = axios
  }
  getUrl: Function = (term) => `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&limit=${this.limit}&rating=${this.rating}&q=${term || 'panda'}`

  mounted () {
    this.$nextTick(() => {
      this.searchGif()
    })
  }

  searchGif () {
    this.items = []
    this.axios.get(this.getUrl(this.searchTerm)).then((response: AxiosResponse) => {
      this.items = response.data.data
    }, (error) => {
      console.error(error)
    })
  }

  // private loadItems () {
  //   if (!this.items.length) {
  //     this.axios.get(this.url).then((response: AxiosResponse) => {
  //       this.items = response.data.data
  //     }, (error) => {
  //       console.error(error)
  //     })
  //   }
  // }
}
