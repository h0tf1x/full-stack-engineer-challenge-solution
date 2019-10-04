import React from 'react'
import { Table } from 'semantic-ui-react'


export default class ScanResultList extends React.Component {

    itemSelected = (item) => {
        if(this.props.onSelect) this.props.onSelect(item)
    }

    render() {
        let { results } = this.props
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>Repo name</Table.Cell>
                        <Table.Cell>Status</Table.Cell>
                        <Table.Cell>Queued at</Table.Cell>
                        <Table.Cell>Scanning at</Table.Cell>
                        <Table.Cell>Finished at</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {results.map(result => {
                        return (
                            <Table.Row key={result._id} onClick={() => { this.itemSelected(result) }}>
                                <Table.Cell>{result.repository}</Table.Cell>
                                <Table.Cell>{result.status}</Table.Cell>
                                <Table.Cell>{result.queuedAt}</Table.Cell>
                                <Table.Cell>{result.scanningAt}</Table.Cell>
                                <Table.Cell>{result.finishedAt}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        )
    }
}