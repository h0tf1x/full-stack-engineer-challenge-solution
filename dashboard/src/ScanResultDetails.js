import React from 'react'
import { Header } from 'semantic-ui-react'


export default class ScanResultDetails extends React.Component {

    render() {
        let { result } = this.props
        if(!result) {
            return (
                <Header as='h4'>Select Scan Result</Header>
            )
        }
        return (
            <div><pre>{JSON.stringify(result.findings, null, '\t')}</pre></div>
        )
    }
}