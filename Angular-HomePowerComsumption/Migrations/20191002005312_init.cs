using Microsoft.EntityFrameworkCore.Migrations;

namespace Angular_HomePowerComsumption.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Floors",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Floors", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "WatthourMeters",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(nullable: true),
                    kwh = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WatthourMeters", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Appliances",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(nullable: true),
                    watt = table.Column<int>(nullable: false),
                    kwh = table.Column<int>(nullable: false),
                    useHrPerMonth = table.Column<float>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    WatthourMeterId = table.Column<int>(nullable: false),
                    FloorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appliances", x => x.id);
                    table.ForeignKey(
                        name: "FK_Appliances_Floors_FloorId",
                        column: x => x.FloorId,
                        principalTable: "Floors",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appliances_WatthourMeters_WatthourMeterId",
                        column: x => x.WatthourMeterId,
                        principalTable: "WatthourMeters",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appliances_FloorId",
                table: "Appliances",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_Appliances_WatthourMeterId",
                table: "Appliances",
                column: "WatthourMeterId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Appliances");

            migrationBuilder.DropTable(
                name: "Floors");

            migrationBuilder.DropTable(
                name: "WatthourMeters");
        }
    }
}
