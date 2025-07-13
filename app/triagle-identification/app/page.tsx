"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Triangle, AlertCircle } from "lucide-react"

interface TriangleData {
  sideA: number
  sideB: number
  sideC: number
  type: string
  isValid: boolean
  error?: string
}

export default function TriangleClassifier() {
  const [sideA, setSideA] = useState("")
  const [sideB, setSideB] = useState("")
  const [sideC, setSideC] = useState("")
  const [triangle, setTriangle] = useState<TriangleData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const identifyTriangle = async (a: number, b: number, c: number): Promise<TriangleData> => {
    try {
      // Call the API endpoint
      const response = await fetch('/api/identify-triangle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sideA: a, sideB: b, sideC: c }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error calling API:', error)
      return {
        sideA: a,
        sideB: b,
        sideC: c,
        type: "",
        isValid: false,
        error: "Failed to connect to the triangle identification service",
      }
    }
  }

  const handleClassify = async () => {
    const a = Number.parseFloat(sideA)
    const b = Number.parseFloat(sideB)
    const c = Number.parseFloat(sideC)

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setTriangle({
        sideA: a || 0,
        sideB: b || 0,
        sideC: c || 0,
        type: "",
        isValid: false,
        error: "Please enter valid numbers for all sides",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await identifyTriangle(a, b, c)
      setTriangle(result)
    } catch (error) {
      setTriangle({
        sideA: a,
        sideB: b,
        sideC: c,
        type: "",
        isValid: false,
        error: "An error occurred while classifying the triangle",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const TriangleVisualization = ({ triangleData }: { triangleData: TriangleData }) => {
    if (!triangleData.isValid) return null

    const { sideA, sideB, sideC, type } = triangleData
    const width = 200
    const height = 150
    const padding = 20

    // Function to calculate triangle centroid (geometric center)
    const calculateCentroid = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
      return {
        x: (x1 + x2 + x3) / 3,
        y: (y1 + y2 + y3) / 3
      }
    }

    // Function to center triangle points around the SVG center
    const centerTriangle = (points: string) => {
      const coords = points.split(' ').map(p => p.split(',').map(Number))
      const centroid = calculateCentroid(coords[0][0], coords[0][1], coords[1][0], coords[1][1], coords[2][0], coords[2][1])
      
      const svgCenterX = width / 2
      const svgCenterY = height / 2
      
      const offsetX = svgCenterX - centroid.x
      const offsetY = svgCenterY - centroid.y
      
      return coords.map(([x, y]) => `${x + offsetX},${y + offsetY}`).join(' ')
    }

    // Calculate triangle points based on type
    let points = ""
    let sideLabels = { a: "", b: "", c: "" }
    // Restore original label positions
    const labelPositions = {
      a: { x: width - 10, y: height - 5 }, // bottom right
      b: { x: 10, y: height - 5 },        // bottom left
      c: { x: width / 2, y: 15 }          // top center
    }

    if (type === "Equilateral") {
      // Equilateral triangle - all sides equal
      const centerX = width / 2;
      const centerY = height / 2 + 10; // shift down
      const topY = centerY - 55; // more vertical spread
      const bottomY = centerY + 45;
      const halfWidth = 50; // wider base
      const x1 = centerX;
      const y1 = topY;
      const x2 = centerX - halfWidth;
      const y2 = bottomY;
      const x3 = centerX + halfWidth;
      const y3 = bottomY;
      points = `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
      sideLabels = {
        a: `${sideA}`,
        b: `${sideB}`,
        c: `${sideC}`
      }
    } else if (type === "Isosceles") {
      // Isosceles triangle - two sides equal
      const centerX = width / 2;
      const centerY = height / 2 + 10; // shift down
      const topY = centerY - 50;
      const bottomY = centerY + 40;
      const baseWidth = 80; // wider base
      const x1 = centerX;
      const y1 = topY;
      const x2 = centerX - baseWidth/2;
      const y2 = bottomY;
      const x3 = centerX + baseWidth/2;
      const y3 = bottomY;
      points = `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
      sideLabels = {
        a: `${sideA}`,
        b: `${sideB}`,
        c: `${sideC}`
      }
    } else {
      // Scalene triangle - all sides different
      const maxSide = Math.max(sideA, sideB, sideC)
      const scale = Math.min((width - 2 * padding) / maxSide, (height - 2 * padding) / maxSide) * 0.8
      
      // Use Heron's formula to calculate height
      const s = (sideA + sideB + sideC) / 2
      const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC))
      const heightScaled = (area * 2 / maxSide) * scale
      
      // Calculate base points
      const x1 = -sideA * scale / 2
      const y1 = heightScaled / 2
      const x2 = sideA * scale / 2
      const y2 = heightScaled / 2
      
      // Calculate third point using cosine law
      const cosA = (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC)
      const sinA = Math.sqrt(1 - cosA * cosA)
      const x3 = sideC * scale * cosA
      const y3 = -sideC * scale * sinA
      
      points = `${x1},${y1} ${x2},${y2} ${x3},${y3}`
      
      // Center the triangle
      points = centerTriangle(points)
      // Shift all points down by 10px for better vertical centering
      points = points.split(' ').map(p => {
        const [x, y] = p.split(',').map(Number);
        return `${x},${y + 10}`;
      }).join(' ');
      sideLabels = {
        a: `${sideA}`,
        b: `${sideB}`,
        c: `${sideC}`
      }
    }

    return (
      <div className="flex justify-center mb-8">
        <svg width={width} height={height} className="text-blue-400">
          <defs>
            <filter id="triangle-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#60a5fa" floodOpacity="0.5" />
            </filter>
          </defs>
          <polygon
            points={points}
            fill="#60a5fa22"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#triangle-shadow)"
          />
          {/* Side labels at fixed positions */}
          <text x={labelPositions.a.x} y={labelPositions.a.y} textAnchor="middle" className="text-xs fill-gray-300">
            {sideLabels.a}
          </text>
          <text x={labelPositions.b.x} y={labelPositions.b.y} textAnchor="middle" className="text-xs fill-gray-300">
            {sideLabels.b}
          </text>
          <text x={labelPositions.c.x} y={labelPositions.c.y} textAnchor="middle" className="text-xs fill-gray-300">
            {sideLabels.c}
          </text>
        </svg>
      </div>
    )
  }

  const getTriangleColor = (type: string) => {
    switch (type) {
      case "Equilateral":
        return "text-green-400"
      case "Isosceles":
        return "text-blue-400"
      case "Scalene":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const getTriangleDescription = (type: string) => {
    switch (type) {
      case "Equilateral":
        return "All three sides are equal"
      case "Isosceles":
        return "Two sides are equal"
      case "Scalene":
        return "All three sides are different"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Triangle className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Triangle Classifier</h1>
          </div>
          <p className="text-gray-400 text-lg">Enter three side lengths to determine the type of triangle</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Triangle Sides</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="sideA" className="text-gray-300 text-sm font-medium">
                    Side A
                  </Label>
                  <Input
                    id="sideA"
                    type="number"
                    step="0.01"
                    min="0"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="Enter length of side A"
                  />
                </div>

                <div>
                  <Label htmlFor="sideB" className="text-gray-300 text-sm font-medium">
                    Side B
                  </Label>
                  <Input
                    id="sideB"
                    type="number"
                    step="0.01"
                    min="0"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="Enter length of side B"
                  />
                </div>

                <div>
                  <Label htmlFor="sideC" className="text-gray-300 text-sm font-medium">
                    Side C
                  </Label>
                  <Input
                    id="sideC"
                    type="number"
                    step="0.01"
                    min="0"
                    value={sideC}
                    onChange={(e) => setSideC(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="Enter length of side C"
                  />
                </div>

                <Button
                  onClick={handleClassify}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105"
                  disabled={!sideA || !sideB || !sideC || isLoading}
                >
                  {isLoading ? "Classifying..." : "Classify Triangle"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Triangle Analysis</h2>

              {triangle ? (
                <div className="space-y-6">
                  {triangle.isValid ? (
                    <>
                      <TriangleVisualization triangleData={triangle} />

                      <div className="text-center">
                        <div className={`text-5xl font-bold mb-2 ${getTriangleColor(triangle.type)}`}>
                          {triangle.type}
                        </div>
                        <p className="text-gray-300 text-lg mb-4">{getTriangleDescription(triangle.type)}</p>

                        <div className="bg-gray-700/50 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-2">Triangle Properties</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Side A:</span>
                              <div className="text-white font-mono">{triangle.sideA}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">Side B:</span>
                              <div className="text-white font-mono">{triangle.sideB}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">Side C:</span>
                              <div className="text-white font-mono">{triangle.sideC}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2 text-red-400">
                          Error
                        </div>
                        <p className="text-red-300 text-lg mb-4">{triangle.error}</p>

                        <div className="bg-gray-700/50 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-2">Input Values</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Side A:</span>
                              <div className="text-white font-mono">{triangle.sideA}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">Side B:</span>
                              <div className="text-white font-mono">{triangle.sideB}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">Side C:</span>
                              <div className="text-white font-mono">{triangle.sideC}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-12">
                  <Triangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Enter three side lengths to see the triangle classification</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <Card className="mt-8 bg-gray-800/30 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Triangle Types</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <div className="text-green-400 font-bold text-lg mb-2">Equilateral</div>
                <p className="text-gray-300 text-sm">All three sides are equal in length</p>
              </div>
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <div className="text-blue-400 font-bold text-lg mb-2">Isosceles</div>
                <p className="text-gray-300 text-sm">Exactly two sides are equal in length</p>
              </div>
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <div className="text-purple-400 font-bold text-lg mb-2">Scalene</div>
                <p className="text-gray-300 text-sm">All three sides are different lengths</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
