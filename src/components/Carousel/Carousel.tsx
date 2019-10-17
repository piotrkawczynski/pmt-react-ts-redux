import React, { Component } from "react"
import { Button } from "reactstrap"

interface CarouselProps {
  children: React.ReactNodeArray
  buttonTextPrev?: string
  buttonTextNext?: string
  onClickButtonNext?: () => void | undefined
  onClickButtonPrev?: () => void | undefined
  isVisibleButtonNext?: boolean
  isVisibleButtonPrev?: boolean
}

interface CarouselState {
  position: number
  direction: "next" | "prev"
  sliding: boolean
}

class Carousel extends Component<CarouselProps, CarouselState> {
  constructor(props: CarouselProps) {
    super(props)
    this.state = {
      position: 0,
      direction: "next",
      sliding: false,
    }
  }

  doSliding = (direction: "next" | "prev", position: number) => {
    this.setState({
      sliding: true,
      direction,
      position,
    })

    setTimeout(() => {
      this.setState({
        sliding: false,
      })
    }, 100)
  }

  prevItem = () => {
    const { onClickButtonPrev } = this.props

    if (onClickButtonPrev) {
      onClickButtonPrev()
    }
    this.doSliding("prev", this.state.position - 1)
  }

  nextItem = () => {
    const { onClickButtonNext } = this.props

    if (onClickButtonNext) {
      onClickButtonNext()
    }
    this.doSliding("next", this.state.position + 1)
  }

  transform = (
    position: number,
    sliding: boolean,
    direction: "next" | "prev"
  ) => {
    if (!sliding) {
      return `translateX(${position * -100}%)`
    }
    if (direction === "next") {
      return `translateX(${position * -100}%)`
    }

    return `translateX(${position * -100}%)`
  }

  render() {
    const { position, sliding, direction } = this.state
    const {
      children,
      buttonTextNext = "Next step",
      buttonTextPrev = "Previous step",
      isVisibleButtonNext = true,
      isVisibleButtonPrev = true,
    } = this.props

    return (
      <div>
        <div
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.75s ease",
              transform: this.transform(position, sliding, direction),
            }}
          >
            {children!.map((child, index) => (
              <div
                key={index}
                style={{
                  flex: "1 0 100%",
                  flexBasis: "100%",
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            padding: 10,
            width: "100%",
            display: "flex",
            ...(position > 0 &&
              position < children.length - 1 && {
                justifyContent: "space-between",
              }),
            ...(position === 0 && { justifyContent: "flex-end" }),
            ...(position === children.length - 1 && {
              justifyContent: "flex-start",
            }),
          }}
        >
          {isVisibleButtonPrev && position > 0 && (
            <Button className="button" onClick={this.prevItem}>
              {buttonTextPrev}
            </Button>
          )}

          {isVisibleButtonNext && position < children.length - 1 && (
            <Button className="button" onClick={this.nextItem}>
              {buttonTextNext}
            </Button>
          )}
        </div>
      </div>
    )
  }
}

export default Carousel
