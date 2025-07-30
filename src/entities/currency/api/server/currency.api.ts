import { promisify } from 'util'
import { parseString } from 'xml2js'
import { Currency } from '../../model/currency.type'

interface CubeData {
    $: {
        currency: string
        rate: string
    }
}

interface XMLParseResult {
    'gesmes:Envelope': {
        Cube: [
            {
                Cube: [
                    {
                        Cube: CubeData[]
                    },
                ]
            },
        ]
    }
}

const parseXml = promisify(parseString)

export const getAvailableCurrencies = async (): Promise<Currency[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}stats/eurofxref/eurofxref-daily.xml`)
        const xmlText = await res.text()

        const result = (await parseXml(xmlText)) as XMLParseResult

        const cubeData = result['gesmes:Envelope']?.['Cube']?.[0]?.['Cube']?.[0]?.['Cube'] || []

        const currencies: Currency[] = cubeData.map((cube: CubeData) => ({
            code: cube.$?.currency || '',
            rate: parseFloat(cube.$?.rate || '0'),
        }))

        return currencies
    } catch (error: unknown) {
        console.error(
            'Error while retrieving available currencies in getAvailableCurrencies method: ',
            error
        )
        return []
    }
}
