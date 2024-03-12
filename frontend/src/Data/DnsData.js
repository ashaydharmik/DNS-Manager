
const sampleDomains = [
    {
      id: 1,
      name: 'example.com',
      records: [
        { id: 101, type: 'A', value: '192.168.1.1' },
        { id: 102, type: 'MX', value: 'mail.example.com' },
      ],
    },
    {
      id: 2,
      name: 'example.net',
      records: [
        { id: 201, type: 'CNAME', value: 'www.example.net' },
        { id: 202, type: 'TXT', value: 'Verification code: ABC123' },
      ],
    },
  ];
  
  export default sampleDomains;
  