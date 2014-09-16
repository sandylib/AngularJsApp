namespace AngularTod.Migrations
{
    using AngularTod.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AngularTod.Models.AngularTodContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AngularTod.Models.AngularTodContext context)
        {
            var r = new Random();
            var items = Enumerable.Range(1, 50).Select(o => new Todo
            {
                DueDate = new DateTime(2014, r.Next(1, 12), r.Next(1, 28)),
                Priority = (byte)r.Next(10),
                Text = o.ToString()
            }).ToArray();
            context.Todoes.AddOrUpdate(item => new { item.Text }, items);
        }
    }
}
