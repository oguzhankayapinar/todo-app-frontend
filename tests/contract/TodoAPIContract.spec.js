const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;


const provider = new Pact({
  consumer: 'FrontendConsumer',
  provider: 'BackendProvider',
  port: 8081,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'INFO',
});

describe('Todo API Contract', () => {
  beforeAll(() => provider.setup()); 

  afterAll(() => provider.finalize()); 

  it('should fetch todos successfully', async () => {
    await provider.addInteraction({
      state: 'There are todos',
      uponReceiving: 'a request to get todos',
      withRequest: {
        method: 'GET',
        path: '/todos',
      },
      willRespondWith: {
        status: 200,
        body: [{ id: 1, title: 'Test Todo', completed: false }],
      },
    });

    const response = await fetch('http://localhost:8081/todos');
    const todos = await response.json();

    expect(response.status).toBe(200);
    expect(todos).toEqual([{ id: 1, title: 'Test Todo', completed: false }]);

    await provider.verify();
  });
});
