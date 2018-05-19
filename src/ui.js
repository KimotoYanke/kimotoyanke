import {h, renderToString, Text, Component} from 'ink'
import Box from 'ink-box'
import Figlet from 'ink-figlet'
import SelectInput from 'ink-select-input'
import { format, differenceInYears } from 'date-fns'
import ansiEscapes from 'ansi-escapes'
import opn from 'opn'

const open = url => opn(url, {wait: false})
const dateOfBirth = new Date(2000, 1, 18)

const handleSelect = item => {
  if (item.action) {
    item.action()
  }
  if (item.url) {
    open(item.url)
  }
}

const toRawString = str => {
  const regex = new RegExp(ansiEscapes.link('(.+?)', '.+?'), 'g')
  return str.replace(regex, '$1')
}

class TypingEffect extends Component {
  constructor (props) {
    super()
    this.state = {
      counter: 0,
      text: renderToString(<span>{props.children}</span>)
    }
  }
  render () {
    const rawText = toRawString(this.state.text)
    if (this.state.counter > rawText.length) {
      clearInterval(this.timer)
      return (<Text>{this.state.text}</Text>)
    }
    return (<Text>{rawText.slice(0, this.state.counter)}</Text>)
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({
        counter: this.state.counter + 1
      })
    }, 50)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }
}

const Link = props => {
  const text = renderToString(<span>{props.children}</span>)
  return <span>{ansiEscapes.link(text, props.url)}</span>
}

const languages = [
  {name: 'JavaScript', url: 'http://www.ecma-international.org/publications/standards/Ecma-262.htm'},
  {name: 'Java', url: 'https://www.java.com'},
  {name: 'Ruby', url: 'https://www.ruby-lang.org'}
]

class UI extends Component {
  constructor () {
    super()
    this.state = {
      viewProfile: false,
      items: [
        {
          label: 'Profile',
          action: () => {
            this.setState({viewProfile: !this.state.viewProfile})
          }
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/kimotoyanke'
        }, {
          label: 'Github',
          url: 'https://github.com/kimotoyanke'
        }, {
          label: 'Quit',
          action: () => {
            process.exit()
          }
        }
      ]}
  }
  render () {
    return (
      <span>
        <Box borderStyle="round" borderColor="cyan" padding={1}>
          <Figlet font="Small Slant" >@ kimotoyanke</Figlet>
        </Box>
        <br />
        <br />
        <div>
          <TypingEffect>
            <Text>I am KimotoYanke.</Text><br />
            <Text>A Web Programmer.</Text>
          </TypingEffect>
          <br />
          {(() => {
            if (this.state.viewProfile) {
              return (<div><br />
                <Text gray>名前:{'\t\t\t'}</Text><Text>木本悠斗(Kimoto Yuto)</Text><br />
                <Text gray>所属:{'\t\t\t'}</Text><Link url="https://www.tokyo-ct.ac.jp/">国立東京工業高等専門学校</Link><br />
                <Text gray>出身:{'\t\t\t'}</Text><Link url="http://www.city.zama.kanagawa.jp">神奈川県座間市</Link><br />
                <Text gray>生年月日:{'\t\t'}</Text><Link url="https://ja.wikipedia.org/wiki/Microsoft_Windows_2000">{format(dateOfBirth, 'YYYY/MM/DD')}</Link>
                <Text>({ differenceInYears(Date.now(), dateOfBirth) }歳)</Text><br />
                <Text gray>使用エディタ:{'\t\t'}</Text><Link url="https://vim.org">Vim</Link><br />
                <Text gray>好きな言語:{'\t\t'}</Text>
                {
                  languages.reduce((acc, l) => {
                    return acc.concat([<Link url={l.url}>{l.name}</Link>, <Text>, </Text>])
                  }, []).slice(0, -1)
                }
                <br/ >
                <Text gray>好きな曲:{'\t\t'}</Text><Link url="https://www.youtube.com/watch?v=LIlZCmETvsY">新宝島 (サカナクション)</Link><br />
                <br/ >

                <Text gray>Name:{'\t\t\t'}</Text><Text>Kimoto Yuto(木本悠斗; the family name is Kimoto)</Text><br />
                <Text gray>A Student of{'\t\t'}</Text><Link url="https://www.tokyo-ct.ac.jp/">National Institute of Technology, Tokyo College(NITTC)</Link><br />
                <Text gray>Hometown:{'\t\t'}</Text><Link url="http://www.city.zama.kanagawa.jp">Zama, Kanagawa, Japan</Link><br />
                <Text gray>Date of Birth:{'\t\t'}</Text><Link url="https://en.wikipedia.org/wiki/Microsoft_Windows_2000">{format(dateOfBirth, 'MMM DD YYYY')}</Link>
                <Text>(Age: { differenceInYears(Date.now(), dateOfBirth) })</Text><br />
                <Text gray>Using Editor:{'\t\t'}</Text><Link url="https://vim.org">Vim</Link><br />
                <Text gray>Favorite Languages:{'\t'}</Text>
                {
                  languages.reduce((acc, l) => {
                    return acc.concat([<Link url={l.url}>{l.name}</Link>, <Text>, </Text>])
                  }, []).slice(0, -1)
                }
                <br />
                <Text gray>Favorite Song:{'\t\t'}</Text><Link url="https://www.youtube.com/watch?v=LIlZCmETvsY">Shin Takarajima (Sakanaction)</Link><br />
              </div>)
            } else {
              return <div />
            }
          })()}
          <SelectInput items={this.state.items} onSelect={handleSelect}/>
        </div>
      </span>
    )
  }
}

export default UI
