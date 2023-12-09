import { defineStore } from 'pinia'

export const useGlobalFunctionStore = defineStore('globalFunctions', {
  state: () => {
    return { scrollLeft: false, scrollRight: false }
  },
  actions: {
    ScrollRight() {
      const container = document.getElementById('tab-left') as HTMLButtonElement
      setTimeout(() => {
        if (this.scrollRight) {
          this.SideScroll(container, 'right', 50, 25, 30)
          this.ScrollRight()
        }
      }, 250)
    },

    ScrollLeft() {
      const container = document.getElementById('tab-left') as HTMLButtonElement
      setTimeout(() => {
        if (this.scrollLeft) {
          this.SideScroll(container, 'left', 50, 25, 30)
          this.ScrollLeft()
        }
      }, 250)
    },

    SideScroll(element: HTMLButtonElement, direction: string, speed: number, distance: number, step: number) {
      let scrollAmount = 0
      let slideTimer = setInterval(function () {
        if (direction == 'left') {
          element.scrollLeft -= step
        } else {
          element.scrollLeft += step
        }
        scrollAmount += step
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer)
        }
      }, speed)
    },

    generateDateString() {
      return (
        (new Date().getMonth() + 1).toString() +
        '/' +
        new Date().getDate().toString() +
        '/' +
        new Date().getFullYear().toString()
      )
    },

    wrapper(arg: void) {
      return function(){
      }
    }
  }
})
