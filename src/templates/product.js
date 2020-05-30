import React, { useState, useRef, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useSpring, useMotionValue } from "framer-motion"
import "./product.css"
import { useTextboxFade } from "../utils/useTextboxFade"

const SCALE = 2.0

const SizeType = {
  ADULT_YOUTH: "adult_youth",
  SML: "sml",
}

const ProductTemplate = props => {
  const { data } = props
  const { date, tag, adult, youth, small, medium, large, photo } = data
  const [isHovering, setHovering] = useState(false)
  const imgRef = useRef(null)
  const [textbox, setTextbox] = useTextboxFade()
  const imgLeftOffset = useSpring(0)
  const sizeType = !!adult || !!youth ? SizeType.ADULT_YOUTH : SizeType.SML

  return (
    <div>
      <motion.img
        ref={imgRef}
        src={photo}
        className="photo-img"
        style={{ left: imgLeftOffset }}
        onMouseEnter={() => {
          const curImageRect = imgRef.current.getBoundingClientRect()
          const heightDifference = (SCALE - 1) * curImageRect.height
          const widthDifference = (SCALE - 1) * curImageRect.width
          const newTextbox = {
            left: curImageRect.left - widthDifference / 2,
            top: curImageRect.bottom + heightDifference / 2,
            width: curImageRect.width + widthDifference,
            opacity: 1,
          }
          if (newTextbox.left < 0) {
            const offset = -newTextbox.left
            imgLeftOffset.set(offset)
            newTextbox.left += offset
          } else if (newTextbox.left + newTextbox.width > window.innerWidth) {
            const offset =
              newTextbox.left + newTextbox.width - window.innerWidth
            imgLeftOffset.set(-offset)
            newTextbox.left -= offset
          }
          setTextbox(newTextbox)
          setHovering(true)
        }}
        onMouseLeave={() => {
          imgLeftOffset.set(0)
          setTextbox(t => ({ ...t, opacity: 0, width: 0, left: -t.width }))
          setHovering(false)
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.8)",
          zIndex: 3,
          padding: 20,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          ...textbox,
        }}
      >
        <h1 style={{ marginTop: 10 }}>{tag}</h1>
        <h3 style={{ marginTop: 0 }}>
          Only {adult + youth + small + medium + large} left!
        </h3>
        {sizeType === SizeType.ADULT_YOUTH && (
          <>
            <p>
              <strong>Adult</strong> {adult} left
            </p>
            <p>
              <strong>Youth</strong> {youth} left
            </p>
          </>
        )}
        {sizeType === SizeType.SML && (
          <>
            <p>
              <strong>Small</strong> {small} left
            </p>
            <p>
              <strong>Medium</strong> {medium} left
            </p>
            <p>
              <strong>Large</strong> {large} left
            </p>
          </>
        )}
      </motion.div>
      <h2 style={{ marginTop: 0, marginBottom: 5 }}>{tag}</h2>
      <p>{new Date(date).toLocaleDateString("en-US")}</p>
      {sizeType === SizeType.ADULT_YOUTH && (
        <>
          <p>{adult} Adult</p>
          <p>{youth} Youth</p>
        </>
      )}
      {sizeType === SizeType.SML && (
        <>
          <p>{small} Small</p>
          <p>{medium} Medium</p>
          <p>{large} Large</p>
        </>
      )}
    </div>
  )
}

export default ProductTemplate
