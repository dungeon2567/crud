export default {
	pessoa: {
		nome: {
			type: 'text',
			label: 'Nome',
			required: true,
		},
		dataCriacao: {
			type: 'date',
			label: 'Data de Criação',
			required: true,
		},
		documento: {
			type: 'text',
			label: 'Documento',
			required: true,
		},
		cep: {
			type: 'text',
			label: 'CEP',
			required: true,
		},
		bairro: {
			type: 'text',
			label: 'Bairro',
			required: true,
		},
		email: {
			type: 'text',
			label: 'Email',
			multiple: true,
        },
	},
};
