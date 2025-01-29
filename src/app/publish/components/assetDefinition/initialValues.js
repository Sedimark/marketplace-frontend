export const initialValuesEmpty = {
  title: '',
  description: '',
  image: '',
  keywords: [],
  url: '',
  url_action: 'POST',
  headers: [{ key: '', value: '' }],
  queries: [{
    name: '',
    label: '',
    description: '',
    type: 'text',
    default_value: '',
    required: true
  }],
  license: '',
  terms_and_condition: '',
  data_controller: '',
  legal_basis: '',
  purpose: '',
  data_protection_contract_point: '',
  consent_withdrawal_contact_point: '',
  switchQuery: false,
  switchPII: false,
  policies: [{ period: { startDate: '', endDate: '' }, policyName: '' }]
}
