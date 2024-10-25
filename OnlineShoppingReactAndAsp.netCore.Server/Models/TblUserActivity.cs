﻿using System;
using System.Collections.Generic;

namespace OnlineShoppingReactAndAsp.netCore.Server.Models;

public partial class TblUserActivity
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string? ActivityType { get; set; }

    public string? Description { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual TblUser User { get; set; } = null!;
}
