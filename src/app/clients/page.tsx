import { fakeClients, fakeStories, fakeDevelopments } from "../../lib/fake-db";


export default function ClientsPage() {
return (
    <div>
      <h1>Clients</h1>
      <ul>
        {fakeClients.map((client) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
}