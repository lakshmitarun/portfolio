import { jsPDF } from 'jspdf'

export const convertImageToPDF = async (imagePath, fileName) => {
  try {
    // Fetch the image
    const response = await fetch(imagePath)
    const blob = await response.blob()
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Create PDF with image dimensions
        const imgWidth = 210 // A4 width in mm
        const imgHeight = (img.height * imgWidth) / img.width
        
        const pdf = new jsPDF({
          orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
          unit: 'mm',
          format: 'a4'
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        // Calculate dimensions to fit on page
        let finalWidth = pdfWidth
        let finalHeight = (img.height * pdfWidth) / img.width

        if (finalHeight > pdfHeight) {
          finalHeight = pdfHeight
          finalWidth = (img.width * pdfHeight) / img.height
        }

        // Center image on page
        const x = (pdfWidth - finalWidth) / 2
        const y = (pdfHeight - finalHeight) / 2

        pdf.addImage(e.target.result, 'PNG', x, y, finalWidth, finalHeight)
        pdf.save(fileName)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(blob)
  } catch (error) {
    console.error('Error converting image to PDF:', error)
    alert('Error downloading certificate. Please try again.')
  }
}
