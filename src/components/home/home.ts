import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'
import axios, { AxiosResponse } from 'axios'

import './home.scss'
import { GIFObject } from '../../../typings/giphy-api'

@Component({
  template: require('./home.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
  }
})
export class HomeComponent extends Vue {

  limit: number = 3
  rating: string = 'PG'
  apiKey: string = process.env.API_KEY
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

}
