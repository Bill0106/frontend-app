import { Component } from '@angular/core'
import { Router } from '@angular/router'

interface Section {
  image: string
  background: string
  title: string
  link: string
}

interface Contact {
  name: string
  url: string
}

@Component({
  selector: 'app-home',
  templateUrl: './template',
})

class HomeComponent {
  private isSliding: boolean = false
  imageDomain: string = 'http://7xtddu.com1.z0.glb.clouddn.com/'
  left: number = 0
  sections: Section[] = [
    {
      image: '1b11d8d7a005a06b42514f5d9022e1df.jpg',
      background: '73ad5a84dcefe956276f1bd07c6316dd.jpg',
      title: 'Bill\'s Hobby - Write as a Interest',
      link: '',
    },
    {
      image: '84abb1fdfd670845666ac89f712b539a.jpg',
      background: '66a7d162d0bdf9aa302e280cbb5d90d6.jpg',
      title: 'Games',
      link: '/games',
    },
    {
      image: '09d6aeb87783661768b52c73f18c3069.jpg',
      background: 'a15bc6b5656eb67d2e0cde3c2e7f583a.jpg',
      title: 'Gourmets',
      link: '/gourmets',
    },
    {
      image: 'fd7f11741da6dd01db206a29d0536427.jpg',
      background: '5233e5089e1ff5fff7a85c8aa13304ff.jpg',
      title: 'Hearthstone',
      link: '/hearthstone',
    },
  ]
  contacts: Contact[] = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/bill2012111',
    },
    {
      name: 'Github',
      url: 'https://github.com/Bill0106',
    },
    {
      name: 'Instagram',
      url: 'http://instagram.com/bill_lord_z',
    },
  ]

  constructor(private router: Router) { }

  carouselSection(direction: string): void {
    if (!this.isSliding) {
      if (direction === 'next' && this.left !== (this.sections.length - 1) * -100) {
        this.left -= 100
      } else if (direction === 'prev' && this.left !== 0) {
        this.left += 100
      }

      this.isSliding = true
      setTimeout(() => {
        this.isSliding = false
      }, 500)
    }
  }

  goSection(link: string): void {
    this.router.navigate([link])
  }
}

export default HomeComponent
