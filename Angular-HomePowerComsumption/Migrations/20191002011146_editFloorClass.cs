using Microsoft.EntityFrameworkCore.Migrations;

namespace Angular_HomePowerComsumption.Migrations
{
    public partial class editFloorClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Floors",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "Floors");
        }
    }
}
