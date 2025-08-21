import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { specificationId } = req.body

    if (!specificationId) {
      return res.status(400).json({ error: 'Specification ID is required' })
    }

    // Get specification from database
    const specification = await prisma.specification.findUnique({
      where: { id: specificationId }
    })

    if (!specification) {
      return res.status(404).json({ error: 'Specification not found' })
    }

    // Generate HTML content
    const htmlContent = generateHTMLContent(specification)

    // Log the export
    await prisma.specificationExport.create({
      data: {
        format: 'html',
        filename: `${specification.title.replace(/[^a-z0-9]/gi, '_')}.html`,
        fileSize: htmlContent.length,
        specificationId: specification.id
      }
    })

    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Content-Disposition', `attachment; filename="${specification.title.replace(/[^a-z0-9]/gi, '_')}.html"`)
    res.status(200).send(htmlContent)

  } catch (error) {
    console.error('Error exporting HTML:', error)
    res.status(500).json({ error: 'Failed to export HTML' })
  }
}

function generateHTMLContent(specification: any): string {
  const formData = specification.formData
  const content = specification.content

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.projectTitle} - Procurement Specification</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #0066cc;
            margin: 0;
            font-size: 2.5em;
        }
        .header h2 {
            color: #666;
            margin: 10px 0;
            font-weight: normal;
        }
        .project-details {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
        }
        .project-details h3 {
            margin-top: 0;
            color: #0066cc;
        }
        .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .detail-item {
            padding: 10px;
            background-color: white;
            border-radius: 3px;
            border-left: 4px solid #0066cc;
        }
        .section {
            margin-bottom: 40px;
        }
        .section h2 {
            color: #0066cc;
            border-bottom: 2px solid #0066cc;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .section-content {
            white-space: pre-wrap;
            text-align: justify;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 0.9em;
        }
        @media print {
            body { background-color: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PROCUREMENT SPECIFICATION</h1>
            <h2>${formData.projectTitle}</h2>
            <p>Generated on ${new Date(specification.createdAt).toLocaleDateString()}</p>
        </div>

        <div class="project-details">
            <h3>Project Details</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>Department:</strong> ${formData.department}
                </div>
                <div class="detail-item">
                    <strong>Category:</strong> ${formData.category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </div>
                <div class="detail-item">
                    <strong>Budget Range:</strong> ${formData.budgetRange}
                </div>
                <div class="detail-item">
                    <strong>Timeline:</strong> ${formData.timeline}
                </div>
                <div class="detail-item">
                    <strong>Urgency:</strong> ${formData.urgency}
                </div>
                <div class="detail-item">
                    <strong>Contact Person:</strong> ${formData.contactPerson}
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Executive Summary</h2>
            <div class="section-content">${content.executiveSummary}</div>
        </div>

        <div class="section">
            <h2>Project Scope</h2>
            <div class="section-content">${content.scope}</div>
        </div>

        <div class="section">
            <h2>Requirements</h2>
            <div class="section-content">${content.requirements}</div>
        </div>

        <div class="section">
            <h2>Technical Specifications</h2>
            <div class="section-content">${content.technicalSpecs}</div>
        </div>

        <div class="section">
            <h2>Compliance & Standards</h2>
            <div class="section-content">${content.compliance}</div>
        </div>

        <div class="section">
            <h2>Evaluation Criteria</h2>
            <div class="section-content">${content.evaluation}</div>
        </div>

        <div class="section">
            <h2>Timeline & Milestones</h2>
            <div class="section-content">${content.timeline}</div>
        </div>

        <div class="section">
            <h2>Budget Considerations</h2>
            <div class="section-content">${content.budget}</div>
        </div>

        <div class="footer">
            <p>Generated by Tribus Advisory AI Specification Generator</p>
            <p>Specification ID: ${specification.id} | Version: ${specification.version}</p>
        </div>
    </div>
</body>
</html>`
}