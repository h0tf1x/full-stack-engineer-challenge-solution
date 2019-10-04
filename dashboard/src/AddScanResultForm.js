import React from 'react'
import { Form } from 'semantic-ui-react'
import config from './config'


export default class ScanResultList extends React.Component {

    state = { result: {}, errors: {} }

    STATUS_OPTIONS = [
        { key: 'Queued', value: 'Queued', text: 'Queued' },
        { key: 'In Progress', value: 'In Progress', text: 'In Progress' },
        { key: 'Success', value: 'Success', text: 'Success' },
        { key: 'Failure', value: 'Failure', text: 'Failure' }
    ]

    saveResult = async (e) => {
        e.preventDefault()
        let { result } = this.state
        let form = e.target
        let data = Object.fromEntries(new FormData(form))
        try {
            data.findings = JSON.parse(data.findings)
        } catch(error) {
            return this.setState({ errors: { findings: { message: 'Not valid json' } } })
        }
        result = Object.assign(result, data)
        let response = await fetch(`${config.API_URL}/results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        })
        if(response.ok) {
            let result = await response.json()
            this.props.onSuccess(result)
            form.reset()
        } else {
            let errors = await response.json()
            this.setState({ errors: errors })
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        let { result } = this.state
        result.status = e.target.innerText
        this.setState({ result: result })
    }

    render() {
        const { errors } = this.state
        return (
            <Form onSubmit={this.saveResult}>
                <Form.Input required label='Repo name' name='repository' error={errors.repository ? errors.repository.message : null} />
                <Form.Select required label='Scan status' options={this.STATUS_OPTIONS} name='status' onChange={this.handleChange} error={errors.status ? errors.status.message : null} />
                <Form.TextArea required label='Findings' placeholder='[]' name='findings' error={errors.findings ? errors.repository.message : null} />
                <Form.Button>Add</Form.Button>
            </Form>
        )
    }
}