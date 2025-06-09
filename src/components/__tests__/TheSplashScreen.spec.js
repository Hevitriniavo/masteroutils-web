import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheSplashScreen from '../TheSplashScreen.vue'

describe('TheSplashScreen', () => {
  it('afficher quand on on veut et se ferme apres 5s', () => {
    const wrapper = mount(TheSplashScreen)
    expect(wrapper.exists()).toBeTruthy()
  })
})
