let participants = [
  {
    name: "Gustavo Nunes",
    email: "gustavo.nbispo@outlook.com",
    dateRegister: new Date(2024, 2, 22, 19, 20),
    dateCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    name: "Davi Souza",
    email: "davi.souza@gmail.com",
    dateRegister: new Date(2024, 2, 22, 19, 20),
    dateCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    name: "Ana Silva",
    email: "ana.silva@gmail.com",
    dateRegister: new Date(2024, 2, 23, 10, 30),
    dateCheckIn: new Date(2024, 2, 26, 15, 45)
  },
  {
    name: "Pedro Oliveira",
    email: "pedro.oliveira@outlook.com",
    dateRegister: new Date(2024, 2, 23, 11, 15),
    dateCheckIn: new Date(2024, 2, 26, 16, 30)
  },
  {
    name: "Maria Santos",
    email: "maria.santos@outlook.com",
    dateRegister: new Date(2024, 2, 24, 14, 0),
    dateCheckIn: new Date(2024, 2, 27, 10, 0)
  },
  {
    name: "João Rodrigues",
    email: "joao.rodrigues@gmail.com",
    dateRegister: new Date(2024, 2, 24, 15, 30),
    dateCheckIn: new Date(2024, 2, 27, 11, 45)
  },
  {
    name: "Carla Pereira",
    email: "carla.pereira@outlook.com",
    dateRegister: new Date(2024, 2, 25, 9, 45),
    dateCheckIn: new Date(2024, 2, 28, 14, 30)
  },
  {
    name: "Rafaela Costa",
    email: "rafaela.costa@gmail.com",
    dateRegister: new Date(2024, 2, 25, 11, 0),
    dateCheckIn: new Date(2024, 2, 28, 15, 15)
  },
  {
    name: "Pedro Henrique",
    email: "pedro.henrique@gmail.com",
    dateRegister: new Date(2024, 2, 26, 12, 30),
    dateCheckIn: new Date(2024, 2, 29, 10, 45)
  },
  {
    name: "Mariana Lima",
    email: "mariana.lima@outlook.com",
    dateRegister: new Date(2024, 2, 26, 14, 15),
    dateCheckIn: new Date(2024, 2, 29, 11, 30)
  }
]

const createNewParticipant = (participant) => {
  const dateRegister = dayjs
    (Date.now())
    .to(participant.dateRegister)

  let dateCheckIn = dayjs
    (Date.now())
    .to(participant.dateCheckIn)

  if (participant.dateCheckIn == null) {
    dateCheckIn = `
    <button data-email="${participant.email}"onclick="makeCheckIn(event)">
    Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
  <td>
    <strong>${participant.name}</strong>
    <br>
    <small>${participant.email}</small>
  </td>
    <td>${dateRegister}</td>
    <td>${dateCheckIn}</td>
  </tr>
`
}

const updateList = (participants) => {
  let output = ""

  for (let participant of participants) {
    output = output + createNewParticipant(participant)
  }

  document.querySelector('tbody').innerHTML = output
}

updateList(participants)

const addParticipant = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participant = {
    name: formData.get('name'),
    email: formData.get('email'),
    dateRegister: new Date(),
    dateCheckIn: null
  }

  const participantExist = participants.find((p) => p.email == participant.email)

  if (participantExist) {
    alert('Email já cadastrado!')
    return
  }

  participants = [participant, ...participants]
  updateList(participants)

  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const makeCheckIn = (event) => {
  const messageConfirm = 'tem certeza que deseja fazer o check-in?'

  if (confirm(messageConfirm) == false) {
    return
  }

  const participant = participants.find(
    (p) => p.email == event.target.dataset.email
  )

  participant.dateCheckIn = new Date()

  updateList(participants)
}

