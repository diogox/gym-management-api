using Microsoft.EntityFrameworkCore.Migrations;

namespace GymAPI.Migrations
{
    public partial class AddEquipment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Equipment",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    BrandName = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    PriceInEuro = table.Column<float>(nullable: false),
                    SupplierName = table.Column<string>(nullable: true),
                    ExerciseId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Equipment_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Equipment_ExerciseId",
                table: "Equipment",
                column: "ExerciseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Equipment");
        }
    }
}
