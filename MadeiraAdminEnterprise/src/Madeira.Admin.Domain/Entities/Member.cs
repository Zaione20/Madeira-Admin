using System;

namespace Madeira.Admin.Domain.Entities
{
    public class Member
    {
        public Guid Id { get; set; }
        public string NomeCompleto { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public DateTime DataCadastro { get; set; }
        public bool Ativo { get; set; }

        public Member(Guid id, string nomeCompleto, DateTime dataNascimento, string email, string telefone)
        {
            Id = id;
            NomeCompleto = nomeCompleto;
            DataNascimento = dataNascimento;
            Email = email;
            Telefone = telefone;
            DataCadastro = DateTime.UtcNow;
            Ativo = true;
        }
    }
}