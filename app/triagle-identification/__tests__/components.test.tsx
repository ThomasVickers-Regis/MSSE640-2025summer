import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock the API call
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock the triangle visualization component
const MockTriangleVisualization = ({ type, sideA, sideB, sideC }: {
  type: string
  sideA: number
  sideB: number
  sideC: number
}) => {
  return (
    <div data-testid="triangle-visualization">
      <div data-testid="triangle-type">{type}</div>
      <div data-testid="triangle-sides">
        A: {sideA}, B: {sideB}, C: {sideC}
      </div>
    </div>
  )
}

// Mock the main page component
const MockTrianglePage = () => {
  const [sideA, setSideA] = React.useState('')
  const [sideB, setSideB] = React.useState('')
  const [sideC, setSideC] = React.useState('')
  const [result, setResult] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/identify-triangle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sideA: parseFloat(sideA),
          sideB: parseFloat(sideB),
          sideC: parseFloat(sideC)
        })
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ isValid: false, error: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Triangle Classifier</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="side-a-input"
          type="number"
          value={sideA}
          onChange={(e) => setSideA(e.target.value)}
          placeholder="Side A"
          step="0.01"
        />
        <input
          data-testid="side-b-input"
          type="number"
          value={sideB}
          onChange={(e) => setSideB(e.target.value)}
          placeholder="Side B"
          step="0.01"
        />
        <input
          data-testid="side-c-input"
          type="number"
          value={sideC}
          onChange={(e) => setSideC(e.target.value)}
          placeholder="Side C"
          step="0.01"
        />
        <button data-testid="submit-button" type="submit" disabled={loading}>
          {loading ? 'Classifying...' : 'Classify Triangle'}
        </button>
      </form>
      
      {result && (
        <div data-testid="result">
          {result.isValid ? (
            <MockTriangleVisualization
              type={result.type}
              sideA={result.sideA}
              sideB={result.sideB}
              sideC={result.sideC}
            />
          ) : (
            <div data-testid="error-message">{result.error}</div>
          )}
        </div>
      )}
    </div>
  )
}

describe('Triangle Classifier UI Components', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe('Form Input Validation', () => {
    test('should accept valid numeric inputs', () => {
      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      const sideBInput = screen.getByTestId('side-b-input')
      const sideCInput = screen.getByTestId('side-c-input')
      
      fireEvent.change(sideAInput, { target: { value: '5' } })
      fireEvent.change(sideBInput, { target: { value: '5' } })
      fireEvent.change(sideCInput, { target: { value: '5' } })
      
      expect(sideAInput).toHaveValue(5)
      expect(sideBInput).toHaveValue(5)
      expect(sideCInput).toHaveValue(5)
    })

    test('should accept decimal inputs', () => {
      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      fireEvent.change(sideAInput, { target: { value: '3.5' } })
      
      expect(sideAInput).toHaveValue(3.5)
    })

    test('should handle empty inputs', () => {
      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      fireEvent.change(sideAInput, { target: { value: '' } })
      
      expect(sideAInput).toHaveValue(null)
    })
  })

  describe('Form Submission', () => {
    test('should submit form with correct data', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          isValid: true,
          type: 'Equilateral',
          sideA: 5,
          sideB: 5,
          sideC: 5
        })
      })

      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      const sideBInput = screen.getByTestId('side-b-input')
      const sideCInput = screen.getByTestId('side-c-input')
      const submitButton = screen.getByTestId('submit-button')
      
      fireEvent.change(sideAInput, { target: { value: '5' } })
      fireEvent.change(sideBInput, { target: { value: '5' } })
      fireEvent.change(sideCInput, { target: { value: '5' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/identify-triangle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sideA: 5,
            sideB: 5,
            sideC: 5
          })
        })
      })
    })

    test('should show loading state during submission', async () => {
      mockFetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)))

      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      const submitButton = screen.getByTestId('submit-button')
      
      fireEvent.change(sideAInput, { target: { value: '5' } })
      fireEvent.click(submitButton)
      
      expect(screen.getByText('Classifying...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })
  })

  describe('Result Display', () => {
    test('should display valid triangle result', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          isValid: true,
          type: 'Equilateral',
          sideA: 5,
          sideB: 5,
          sideC: 5
        })
      })

      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      const submitButton = screen.getByTestId('submit-button')
      
      fireEvent.change(sideAInput, { target: { value: '5' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('triangle-type')).toHaveTextContent('Equilateral')
        expect(screen.getByTestId('triangle-sides')).toHaveTextContent('A: 5, B: 5, C: 5')
      })
    })

    test('should display error message for invalid triangle', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          isValid: false,
          error: 'These sides cannot form a valid triangle'
        })
      })

      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      const submitButton = screen.getByTestId('submit-button')
      
      fireEvent.change(sideAInput, { target: { value: '1' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent('These sides cannot form a valid triangle')
      })
    })

    test('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      const submitButton = screen.getByTestId('submit-button')
      
      fireEvent.change(sideAInput, { target: { value: '5' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent('Network error')
      })
    })
  })

  describe('Triangle Visualization Component', () => {
    test('should render triangle type correctly', () => {
      render(
        <MockTriangleVisualization
          type="Scalene"
          sideA={3}
          sideB={4}
          sideC={5}
        />
      )
      
      expect(screen.getByTestId('triangle-type')).toHaveTextContent('Scalene')
      expect(screen.getByTestId('triangle-sides')).toHaveTextContent('A: 3, B: 4, C: 5')
    })

    test('should handle different triangle types', () => {
      const { rerender } = render(
        <MockTriangleVisualization
          type="Equilateral"
          sideA={5}
          sideB={5}
          sideC={5}
        />
      )
      
      expect(screen.getByTestId('triangle-type')).toHaveTextContent('Equilateral')
      
      rerender(
        <MockTriangleVisualization
          type="Isosceles"
          sideA={5}
          sideB={5}
          sideC={3}
        />
      )
      
      expect(screen.getByTestId('triangle-type')).toHaveTextContent('Isosceles')
    })
  })

  describe('User Interaction Flow', () => {
    test('should handle complete user workflow', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          isValid: true,
          type: 'Isosceles',
          sideA: 5,
          sideB: 5,
          sideC: 3
        })
      })

      render(<MockTrianglePage />)
      
      // Fill out the form
      const sideAInput = screen.getByTestId('side-a-input')
      const sideBInput = screen.getByTestId('side-b-input')
      const sideCInput = screen.getByTestId('side-c-input')
      
      fireEvent.change(sideAInput, { target: { value: '5' } })
      fireEvent.change(sideBInput, { target: { value: '5' } })
      fireEvent.change(sideCInput, { target: { value: '3' } })
      
      // Submit the form
      const submitButton = screen.getByTestId('submit-button')
      fireEvent.click(submitButton)
      
      // Verify the result
      await waitFor(() => {
        expect(screen.getByTestId('triangle-type')).toHaveTextContent('Isosceles')
        expect(screen.getByTestId('triangle-sides')).toHaveTextContent('A: 5, B: 5, C: 3')
      })
    })

    test('should clear previous results on new submission', async () => {
      // First submission - valid triangle
      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          isValid: true,
          type: 'Equilateral',
          sideA: 5,
          sideB: 5,
          sideC: 5
        })
      })

      render(<MockTrianglePage />)
      
      const sideAInput = screen.getByTestId('side-a-input')
      const submitButton = screen.getByTestId('submit-button')
      
      fireEvent.change(sideAInput, { target: { value: '5' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('triangle-type')).toHaveTextContent('Equilateral')
      })
      
      // Second submission - invalid triangle
      mockFetch.mockResolvedValueOnce({
        json: async () => ({
          isValid: false,
          error: 'These sides cannot form a valid triangle'
        })
      })
      
      fireEvent.change(sideAInput, { target: { value: '1' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent('These sides cannot form a valid triangle')
        expect(screen.queryByTestId('triangle-type')).not.toBeInTheDocument()
      })
    })
  })
}) 