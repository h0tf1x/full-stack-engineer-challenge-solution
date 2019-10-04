import React from 'react'
import ScanResultList from './ScanResultList'
import ScanResultDetails from './ScanResultDetails'
import AddScanResultForm from './AddScanResultForm'
import { Grid, Button } from 'semantic-ui-react'
import config from './config'


class App extends React.Component {
    state = { results: [], offset: 0, limit: config.RESULTS_PER_PAGE, selectedResult: null }

    load = async () => {
        let { results, limit, offset } = this.state
        let response = await fetch(`${config.API_URL}/results?limit=${limit}&offset=${offset}`)
        if(response.ok) {
            let newResults = await response.json()
            this.setState({ results: newResults.concat(results), offset: offset + results.length })
        }
    }

    setSelectedResult = (result) => {
        this.setState({ selectedResult: result })
    }

    addResult = (result) => {
        let { results } = this.state
        results.unshift(result)
        this.setState({ results: results })
    }

    async componentDidMount() {
        await this.load()
    }

    render() {
        let { results, selectedResult } = this.state
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <AddScanResultForm onSuccess={this.addResult} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <ScanResultList onSelect={this.setSelectedResult} results={results} />
                        <Button onClick={this.load}>Load more</Button>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <ScanResultDetails result={selectedResult} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default App
